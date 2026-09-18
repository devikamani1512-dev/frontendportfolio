import React from "react";
import "./CurrentlyBuilding.css";

const CurrentlyBuilding = () => {
  return (
    <section className="currently-building-section" id="currently-building">
      <div className="currently-building-heading">
        <span className="currently-building-label">CURRENTLY BUILDING</span>

        <h2>Learning & Building with Python</h2>

        <p>
          Currently progressing through Gen AI Python Full Stack Development
          and strengthening my Python problem-solving skills.
        </p>
      </div>

      <div className="currently-building-card">
        <div className="building-icon">
          PY
        </div>

        <div className="building-content">
          <div className="building-top">
            <span className="building-status">
              ● IN PROGRESS
            </span>

            <span className="building-day">
              DAY 28 COMPLETED
            </span>
          </div>

          <h3>Gen AI Python Full Stack Development</h3>

          <p className="building-course">
            Currently learning Python through practical exercises,
            problem-solving and AI-assisted development.
          </p>

          <div className="building-progress">
            <div className="progress-info">
              <span>Learning Progress</span>
              <strong>Day 28</strong>
            </div>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>

          <div className="building-topics">
            <span>Python</span>
            <span>Arrays</span>
            <span>String Manipulation</span>
            <span>Problem Solving</span>
            <span>AI Tools</span>
          </div>

          <div className="building-current">
            <h4>Currently Learning</h4>

            <p>
              Arrays & String Manipulation Problems + AI Problem-Solving Hints
            </p>

            <span className="building-next">
              🚀 Continuing towards Full Stack Development
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyBuilding;