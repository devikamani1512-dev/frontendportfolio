import React, { useRef, useState } from "react";
import profilePhoto from "../assets/profilephoto.jpg";
import introAudio from "../assets/devikaintro.mp3";

const Hero = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Audio could not be played:", error);
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <>
      {/* ================================
          VOICE INTRO STYLE
      ================================= */}
      <style>{`
        .voice-play-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          height: 52px;
          min-width: 260px;
          padding: 6px 18px 6px 8px;

          background: var(--surface-color);
          border: 2px solid var(--primary-color);
          border-radius: 14px;

          color: var(--primary-color);
          cursor: pointer;
          outline: none;

          transition: all 0.3s ease;
          overflow: hidden;
        }

        .voice-play-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 22px var(--shadow-color);
        }

        /* Headphone area */
        .voice-icon-wrapper {
          position: relative;
          width: 42px;
          height: 42px;
          min-width: 42px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Rotating dotted circle */
        .voice-icon-wrapper::before {
          content: "";
          position: absolute;
          inset: -3px;

          border: 2px dotted var(--primary-color);
          border-radius: 50%;

          animation: rotateVoiceRing 5s linear infinite;
        }

        /* Second subtle dotted ring */
        .voice-icon-wrapper::after {
          content: "";
          position: absolute;
          inset: 2px;

          border: 1px dotted var(--primary-color);
          border-radius: 50%;

          opacity: 0.45;
          animation: rotateVoiceRingReverse 7s linear infinite;
        }

        @keyframes rotateVoiceRing {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateVoiceRingReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        /* Purple headphone/play circle */
        .voice-icon {
          position: relative;
          z-index: 2;

          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: var(--primary-color);
          color: #ffffff;

          border-radius: 50%;

          box-shadow: 0 5px 15px var(--shadow-color);

          transition: all 0.3s ease;
        }

        .voice-play-btn:hover .voice-icon {
          transform: scale(1.08);
        }

        .voice-icon svg {
          width: 21px;
          height: 21px;
        }

        .voice-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;

          line-height: 1.2;
        }

        .voice-text strong {
          color: var(--primary-color);
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }

        .voice-text small {
          margin-top: 4px;
          color: var(--muted-color);
          font-size: 10px;
          font-weight: 500;
          white-space: nowrap;
        }

        @media (max-width: 600px) {
          .voice-play-btn {
            min-width: 245px;
            height: 50px;
          }

          .voice-text strong {
            font-size: 12px;
          }

          .voice-text small {
            font-size: 9px;
          }
        }
      `}</style>

      <section className="hero" id="home">
        <div className="hero-container">

          {/* ================================
              LEFT CONTENT
          ================================= */}

          <div className="hero-content">
            <div className="availability-badge">
  <span className="availability-dot"></span>

  <div className="availability-text">
    <strong>OPEN TO NEW OPPORTUNITIES</strong>
    <small>Ready to build • Ready to grow</small>
  </div>
</div>

            <p className="hero-small-title">
              WELCOME TO MY PORTFOLIO
            </p>

            <h1>
              Hi, I'm <span>Devika Manikandan</span>
            </h1>

            <h2>
              Python Backend & Gen AI Developer
            </h2>

            <p className="hero-description">
              Motivated and detail-oriented Frontend Developer transitioning
              into Full Stack Development. I build responsive and user-friendly
              web and mobile applications using modern frontend technologies.
            </p>


            {/* ================================
                BUTTONS + VOICE INTRO
            ================================= */}

            <div className="hero-buttons">

              {/* Hire Me */}
              <a
                href="#contact"
                className="btn primary-btn"
              >
                Hire Me
              </a>


              <a
  href="/Devika_Manikandan_Resume.pdf"
  download="Devika_Manikandan_Resume.pdf"
  className="btn secondary-btn"
>
  Download Resume
</a>


              {/* ================================
                  VOICE INTRO
              ================================= */}

              <button
                type="button"
                className="voice-play-btn"
                onClick={handlePlayPause}
                aria-label={
                  isPlaying
                    ? "Pause introduction"
                    : "Play introduction"
                }
              >

                {/* Headphone + rotating dotted circle */}
                <span className="voice-icon-wrapper">

                  <span className="voice-icon">

                    {isPlaying ? (
                      /* Pause Icon */
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <rect
                          x="6"
                          y="5"
                          width="4"
                          height="14"
                          rx="1"
                        />
                        <rect
                          x="14"
                          y="5"
                          width="4"
                          height="14"
                          rx="1"
                        />
                      </svg>
                    ) : (
                      /* Headphone Icon */
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 14a8 8 0 0 1 16 0" />

                        <path d="M4 14v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z" />

                        <path d="M20 14v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
                      </svg>
                    )}

                  </span>

                </span>


                {/* Text */}
                <span className="voice-text">

                  <strong>
                    {isPlaying
                      ? "Pause Introduction"
                      : "Listen to My Introduction"}
                  </strong>

                  <small>
                    48 sec • Quick Self Introduction
                  </small>

                </span>

              </button>

            </div>


            {/* Hidden Audio */}
            <audio
              ref={audioRef}
              src={introAudio}
              onEnded={handleAudioEnd}
              preload="metadata"
            />


            {/* ================================
                SOCIAL LINKS
            ================================= */}

            <div className="hero-social">

              {/* GitHub */}
              <a
                href="https://github.com/devikamani1512-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49v-1.72c-2.78.62-3.37-1.22-3.37-1.22-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1.01.08 1.55 1.07 1.55 1.07.9 1.58 2.35 1.12 2.93.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.2 9.2 0 0 1 5.01 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .31.18.59.69.49A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                </svg>
              </a>


              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/devika-u1503"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.57V8.99h3.57v11.46Z" />
                </svg>
              </a>


             <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=devikamani1512@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="social-icon"
  aria-label="Email"
>
  <svg
    viewBox="0 0 24 24"
    width="21"
    height="21"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
    />
    <path d="m3 7 9 6 9-6" />
  </svg>
</a>

            </div>

          </div>


          {/* ================================
              RIGHT SIDE PHOTO
          ================================= */}

          <div className="hero-image">

            <img
              src={profilePhoto}
              alt="Devika Manikandan"
            />

          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;