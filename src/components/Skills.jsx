import React from "react";
import "./Skills.css";

const Skills = () => {
  return (
    <section className="skills-section" id="skills">

      {/* HEADING */}
      <div className="skills-heading">

        <span className="skills-label">
          SPECIALIZATIONS
        </span>

        <h2>My Expertise</h2>

        <p>
          Building responsive digital experiences with modern frontend
          technologies and developing my skills in Python backend development.
        </p>

      </div>

      {/* SKILL CARDS */}
      <div className="skills-container">

        {/* FRONTEND */}
<div className="skill-card">

  <div className="skill-icon">
    &lt;/&gt;
  </div>

  <h3>Frontend Development</h3>

  <p>
    Creating responsive, user-friendly and modern web and mobile
    interfaces using modern frontend technologies.
  </p>

  <div className="skill-tags">
    <span>HTML</span>
    <span>CSS</span>
    <span>JAVASCRIPT</span>
    <span>REACT</span>
    <span>REACT NATIVE</span>
    <span>TAILWIND CSS</span>
  </div>

</div>


{/* BACKEND */}
<div className="skill-card">

  <div className="skill-icon">
    PY
  </div>

  <h3>Backend Development</h3>

  <p>
    Currently developing backend development skills using Python
    and learning how to build practical backend applications.
  </p>

  <div className="skill-tags">
    <span>PYTHON</span>
    <span>BACKEND</span>
    <span>API</span>
  </div>

</div>


{/* TOOLS */}
<div className="skill-card">

  <div className="skill-icon">
    ⚙
  </div>

  <h3>Tools & Technologies</h3>

  <p>
    Using modern development tools to build, manage and deploy
    web applications efficiently.
  </p>

  <div className="skill-tags">
    <span>GITHUB</span>
    <span>VS CODE</span>
    <span>VERCEL</span>
  </div>

</div>

      </div>

    </section>
  );
};

export default Skills;