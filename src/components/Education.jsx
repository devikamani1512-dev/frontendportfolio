import React from "react";
import "./Education.css";

const Education = () => {
  const educationData = [
    {
      title: "Bachelor of Business Administration (BBA)",
      institution: "Madurai Kamaraj University",
      year: "2015 - 2018",
      score: "74%",
      icon: "🎓",
    },
    {
      title: "Diploma in Textile Technology",
      institution:
        "P.A.C. Ramasamy Raja Polytechnic College, Rajapalayam",
      year: "2011 - 2013",
      score: "92%",
      icon: "🎓",
    },
    {
      title: "10th Standard",
      institution:
        "Government Higher Secondary School, Alangulam",
      year: "2011",
      score: "84% — 420 Marks",
      icon: "🎓",
    },
    {
      title: "Gen AI Python Full Stack Development",
      institution: "Vetri Technology Solution",
      year: "July 2026 - November 2026",
      score: "Internship Started: 24 August 2026",
      icon: "💻",
    },
  ];

  return (
    <section className="education-section" id="education">

      <div className="education-heading">

        <span className="education-label">
          MY EDUCATION
        </span>

        <h2>
          Education & Qualification
        </h2>

        <p>
          My academic journey and educational qualifications that have
          supported my professional growth.
        </p>

      </div>

      <div className="education-container">

        {educationData.map((education, index) => (

          <div
            className="education-card"
            key={index}
          >

            <div className="education-icon">
              {education.icon}
            </div>

            <div className="education-content">

              <h3>
                {education.title}
              </h3>

              <h4>
                {education.institution}
              </h4>

              <p className="education-year">
                {education.year}
              </p>

              <span className="education-score">
                {education.score}
              </span>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Education;