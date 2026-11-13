import React, { useEffect, useState } from "react";
import "./Skills.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Default skills (backend respond pannala na idhu show aagum)
const defaultSkills = [
  {
    title: "Frontend Development",
    icon: "</>",
    description:
      "Creating responsive, user-friendly and modern web and mobile interfaces using modern frontend technologies.",
    tags: ["HTML", "CSS", "JAVASCRIPT", "REACT", "REACT NATIVE", "TAILWIND CSS"],
  },
    {
    title: "Backend Development",
    icon: "PY",
    description:
      "Building REST APIs with Django REST Framework and FastAPI, with JWT authentication and PostgreSQL databases.",
    tags: [
      "PYTHON",
      "DJANGO",
      "DJANGO REST FRAMEWORK",
      "FASTAPI",
      "REST API",
      "JWT",
      "POSTGRESQL",
    ],
  },
  {
    title: "Tools & Technologies",
    icon: "⚙",
    description:
      "Using modern development tools to build, manage and deploy web applications efficiently.",
    tags: ["GITHUB", "VS CODE", "VERCEL", "RENDER"],
  },
];

const Skills = () => {
  const [skills, setSkills] = useState(defaultSkills);

  // Backend la irundhu skills edukkudhu
  useEffect(() => {
    fetch(`${API_URL}/skills`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      })
      .catch((err) => console.error("Backend not reachable:", err));
  }, []);

  return (
    <section className="skills-section" id="skills">

      {/* HEADING */}
      <div className="skills-heading">

        <span className="skills-label">
          SPECIALIZATIONS
        </span>

        <h2>My Expertise</h2>

        <p>
          Building complete web applications with React, Python and PostgreSQL, from responsive interfaces to secure REST APIs.
        </p>

      </div>

      {/* SKILL CARDS */}
      <div className="skills-container">

        {skills.map((skill, index) => (
          <div className="skill-card" key={skill.id || index}>

            <div className="skill-icon">
              {skill.icon}
            </div>

            <h3>{skill.title}</h3>

            <p>{skill.description}</p>

            <div className="skill-tags">
              {skill.tags.map((tag, tagIndex) => (
                <span key={tagIndex}>{tag}</span>
              ))}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Skills;