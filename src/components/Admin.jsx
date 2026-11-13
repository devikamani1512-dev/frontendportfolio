import React, { useEffect, useState } from "react";
import "./Admin.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const TOKEN_KEY = "admin_token";

/* =====================================================
   PROJECTS TAB
===================================================== */

const emptyProject = {
  title: "",
  description: "",
  technologies: "",
  image: "",
  link: "",
  github: "",
  api: "",
};

const ProjectsManager = ({ authFetch, notify }) => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`);
      setProjects(await res.json());
    } catch (err) {
      notify("Projects load aagala.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    notify("");

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim().toUpperCase())
        .filter(Boolean),
      image: form.image.trim(),
      link: form.link.trim(),
      github: form.github.trim() || null,
      api: form.api.trim() || null,
    };

    try {
      const res = await authFetch(
        editingId ? `/projects/${editingId}` : "/projects",
        {
          method: editingId ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        notify(editingId ? "Project update aayiduchu." : "Project add aayiduchu.");
        setForm(emptyProject);
        setEditingId(null);
        await load();
      } else {
        notify("Save aagala. Ellam fields um correct ah irukka nu paarunga.");
      }
    } catch (err) {
      // 401 already handled in authFetch
    }
    setLoading(false);
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title || "",
      description: p.description || "",
      technologies: (p.technologies || []).join(", "),
      image: p.image || "",
      link: p.link || "",
      github: p.github || "",
      api: p.api || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyProject);
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`"${p.title}" delete pannanuma?`)) return;
    try {
      const res = await authFetch(`/projects/${p.id}`, { method: "DELETE" });
      if (res.ok) {
        notify("Project delete aayiduchu.");
        await load();
      } else {
        notify("Delete aagala.");
      }
    } catch (err) {
      // 401 already handled
    }
  };

  return (
    <>
      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Project" : "Add New Project"}</h3>

        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />

        <textarea
          name="description"
          placeholder="Description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="technologies"
          placeholder="Technologies (comma separated) e.g. React, FastAPI, CSS"
          value={form.technologies}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image: key (phototype) or URL / path (/images/app.png)"
          value={form.image}
          onChange={handleChange}
          required
        />

        <input name="link" placeholder="Live link" value={form.link} onChange={handleChange} required />
        <input name="github" placeholder="GitHub link (optional)" value={form.github} onChange={handleChange} />
        <input name="api" placeholder="API link (optional)" value={form.api} onChange={handleChange} />

        <div className="admin-form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
          </button>
          {editingId && (
            <button type="button" className="admin-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        <h3>All Projects ({projects.length})</h3>

        {projects.map((p) => (
          <div className="admin-item" key={p.id}>
            <div>
              <strong>{p.title}</strong>
              <small>
                #{p.id} · {(p.technologies || []).join(", ")}
              </small>
            </div>

            <div className="admin-item-buttons">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button className="admin-delete" onClick={() => handleDelete(p)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

/* =====================================================
   SKILLS TAB
===================================================== */

const emptySkill = { title: "", icon: "", description: "", tags: "" };

const SkillsManager = ({ authFetch, notify }) => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptySkill);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const res = await fetch(`${API_URL}/skills`);
      setSkills(await res.json());
    } catch (err) {
      notify("Skills load aagala.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    notify("");

    const payload = {
      title: form.title.trim(),
      icon: form.icon.trim(),
      description: form.description.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const res = await authFetch(
        editingId ? `/skills/${editingId}` : "/skills",
        {
          method: editingId ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        notify(editingId ? "Skill update aayiduchu." : "Skill add aayiduchu.");
        setForm(emptySkill);
        setEditingId(null);
        await load();
      } else {
        notify("Save aagala. Ellam fields um correct ah irukka nu paarunga.");
      }
    } catch (err) {
      // 401 already handled
    }
    setLoading(false);
  };

  const handleEdit = (s) => {
    setEditingId(s.id);
    setForm({
      title: s.title || "",
      icon: s.icon || "",
      description: s.description || "",
      tags: (s.tags || []).join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptySkill);
  };

  const handleDelete = async (s) => {
    if (!window.confirm(`"${s.title}" delete pannanuma?`)) return;
    try {
      const res = await authFetch(`/skills/${s.id}`, { method: "DELETE" });
      if (res.ok) {
        notify("Skill delete aayiduchu.");
        await load();
      } else {
        notify("Delete aagala.");
      }
    } catch (err) {
      // 401 already handled
    }
  };

  return (
    <>
      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Skill Card" : "Add New Skill Card"}</h3>

        <input name="title" placeholder="Title (e.g. Frontend Development)" value={form.title} onChange={handleChange} required />

        <input
          name="icon"
          placeholder="Icon text (e.g. PY, </>, or an emoji)"
          value={form.icon}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="tags"
          placeholder="Tags (comma separated) e.g. HTML, CSS, REACT"
          value={form.tags}
          onChange={handleChange}
          required
        />

        <div className="admin-form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Skill" : "Add Skill"}
          </button>
          {editingId && (
            <button type="button" className="admin-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        <h3>All Skill Cards ({skills.length})</h3>

        {skills.map((s) => (
          <div className="admin-item" key={s.id}>
            <div>
              <strong>
                {s.icon} {s.title}
              </strong>
              <small>{(s.tags || []).join(", ")}</small>
            </div>

            <div className="admin-item-buttons">
              <button onClick={() => handleEdit(s)}>Edit</button>
              <button className="admin-delete" onClick={() => handleDelete(s)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

/* =====================================================
   MESSAGES TAB
===================================================== */

const MessagesViewer = ({ authFetch, notify }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await authFetch("/admin/messages");
      if (res.ok) setMessages(await res.json());
      else notify("Messages load aagala.");
    } catch (err) {
      // 401 already handled
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (m) => {
    if (!window.confirm(`${m.name} oda message delete pannanuma?`)) return;
    try {
      const res = await authFetch(`/admin/messages/${m.id}`, { method: "DELETE" });
      if (res.ok) {
        notify("Message delete aayiduchu.");
        await load();
      } else {
        notify("Delete aagala.");
      }
    } catch (err) {
      // 401 already handled
    }
  };

  return (
    <div className="admin-list">
      <h3>Messages ({messages.length})</h3>

      {loading && <p className="admin-empty">Loading...</p>}

      {!loading && messages.length === 0 && (
        <p className="admin-empty">Innum message edhuvum varala.</p>
      )}

      {messages.map((m) => (
        <div className="admin-msg" key={m.id}>
          <div className="admin-msg-head">
            <div>
              <strong>{m.name}</strong>
              <a href={`mailto:${m.email}`}>{m.email}</a>
            </div>
            <small>{new Date(m.time).toLocaleString()}</small>
          </div>

          {m.subject && <h4>{m.subject}</h4>}
          <p>{m.message}</p>

          <div className="admin-item-buttons">
            <a className="admin-reply" href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.subject || "Your message"))}`}>
              Reply
            </a>
            <button className="admin-delete" onClick={() => handleDelete(m)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

/* =====================================================
   ADMIN (LOGIN + TABS)
===================================================== */

const Admin = () => {
  const [token, setToken] = useState(
    () => sessionStorage.getItem(TOKEN_KEY) || ""
  );
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [tab, setTab] = useState("projects");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const logout = (msg = "") => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setMessage(msg);
  };

  const authFetch = async (path, options = {}) => {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (res.status === 401) {
      logout("Session expire aayiduchu. Thirumba login pannunga.");
      throw new Error("Unauthorized");
    }
    return res;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        setMessage("Username or password thappu.");
      } else {
        const data = await res.json();
        sessionStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setCredentials({ username: "", password: "" });
      }
    } catch (err) {
      setMessage("Server connect aagala. Konjam neram kazhichu try pannunga.");
    }
    setLoading(false);
  };

  const switchTab = (name) => {
    setTab(name);
    setMessage("");
  };

  // ---------- login screen ----------

  if (!token) {
    return (
      <div className="admin-page">
        <form className="admin-login" onSubmit={handleLogin}>
          <h2>Admin Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>

          {message && <p className="admin-message">{message}</p>}

          <a href="#" className="admin-back">
            ← Back to portfolio
          </a>
        </form>
      </div>
    );
  }

  // ---------- dashboard ----------

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-topbar">
          <h2>Admin Panel</h2>
          <div>
            <a href="#" className="admin-back">
              ← Portfolio
            </a>
            <button className="admin-logout" onClick={() => logout()}>
              Logout
            </button>
          </div>
        </div>

        <div className="admin-tabs">
          {[
            ["projects", "Projects"],
            ["skills", "Skills"],
            ["messages", "Messages"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={`admin-tab ${tab === key ? "active" : ""}`}
              onClick={() => switchTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {message && <p className="admin-message">{message}</p>}

        {tab === "projects" && (
          <ProjectsManager authFetch={authFetch} notify={setMessage} />
        )}
        {tab === "skills" && (
          <SkillsManager authFetch={authFetch} notify={setMessage} />
        )}
        {tab === "messages" && (
          <MessagesViewer authFetch={authFetch} notify={setMessage} />
        )}
      </div>
    </div>
  );
};

export default Admin;