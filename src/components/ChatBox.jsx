import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const SUGGESTIONS = [
  "What projects has Devika built?",
  "What are her skills?",
  "Tell me about her experience",
];
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm Devika's AI assistant. Ask me about her skills, projects or experience." },
  ]);
  const bodyRef = useRef(null);
  const voiceRef = useRef(false); // async code la latest value paakka

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const setVoice = (on) => {
    voiceRef.current = on;
    setVoiceOn(on);
    if (!on) window.speechSynthesis?.cancel();
  };

  const speak = (text) => {
    if (!voiceRef.current || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[*_#`]/g, ""));
    u.lang = "en-IN";
    window.speechSynthesis.speak(u);
  };

  const ask = async (raw) => {
    const text = raw.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    let reply = "Sorry, something went wrong. Please try again.";
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (res.ok) reply = (await res.json()).reply;
      else if (res.status === 429) reply = "Too many questions, please try again in a minute.";
    } catch {
      reply = "Can't reach the server right now.";
    }
    setMessages((m) => [...m, { role: "bot", text: reply }]);
    setLoading(false);
    speak(reply);
  };

  const startMic = () => {
    if (!SpeechRecognition || listening) return;
    window.speechSynthesis?.cancel(); // bot pesittu irundha nirutthum
    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.onresult = (e) => {
      setVoice(true); // mic use panna answer um padichi kaattum
      ask(e.results[0][0].transcript);
    };
    rec.start();
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <span>🤖 Ask Devika's AI</span>
        {window.speechSynthesis && (
          <button
            type="button"
            className="chat-voice-toggle"
            onClick={() => setVoice(!voiceOn)}
            title="Read answers aloud"
          >
            {voiceOn ? "🔊" : "🔇"}
          </button>
        )}
      </div>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
        ))}
        {loading && <div className="chat-msg bot">Typing...</div>}

        {messages.length === 1 && (
          <div className="chat-chips">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => ask(s)}>{s}</button>
            ))}
          </div>
        )}
      </div>

      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={listening ? "Listening..." : "Ask about my projects..."}
          maxLength={300}
        />
        {SpeechRecognition && (
          <button
            type="button"
            className={`chat-mic ${listening ? "on" : ""}`}
            onClick={startMic}
            aria-label="Speak your question"
          >
            🎤
          </button>
        )}
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}