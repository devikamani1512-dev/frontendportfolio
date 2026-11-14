import React from "react";
import "./CurrentlyBuilding.css";

// Progress maathanum na inga mattum maathunga
const CURRENT_DAY = 66;
const TOTAL_DAYS = 75;
const progressPercent = Math.round((CURRENT_DAY / TOTAL_DAYS) * 100);

const CurrentlyBuilding = () => {
  return (
    <section className="currently-building-section" id="currently-building">
      <div className="currently-building-heading">
        <span className="currently-building-label">CURRENTLY BUILDING</span>

        <h2>Learning & Building with Gen AI</h2>

        <p>
          Currently progressing through the Gen AI module of my Gen AI Python
          Full Stack Development training, covering LLMs, RAG, machine learning
          and deep learning.
        </p>
      </div>

      <div className="currently-building-card">
        <div className="building-icon">
          AI
        </div>

        <div className="building-content">
          <div className="building-top">
            <span className="building-status">
              ● IN PROGRESS
            </span>

            <span className="building-day">
              DAY {CURRENT_DAY} COMPLETED
            </span>
          </div>

          <h3>Gen AI Python Full Stack Development</h3>

          <p className="building-course">
            Studying LLMs, RAG, machine learning and deep learning, and
            preparing to apply them in a hands-on Gen AI project.
          </p>

          <div className="building-progress">
            <div className="progress-info">
              <span>Learning Progress</span>
              <strong>Day {CURRENT_DAY} of {TOTAL_DAYS}</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="building-topics">
            <span>LLM</span>
            <span>RAG</span>
            <span>Machine Learning</span>
            <span>Deep Learning</span>
            <span>Gen AI</span>
          </div>

          <div className="building-current">
            <h4>Currently Learning</h4>

            <p>
              LLMs, RAG, Machine Learning & Deep Learning concepts, and
              planning the upcoming Gen AI project
            </p>

            <span className="building-next">
              🚀 Next: building a hands-on Gen AI project
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyBuilding;