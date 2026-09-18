import React from "react";
import srijayajothiImage from "../assets/srijayajothi.jpg";
import collegeImage from "../assets/college.jpg";
import "./WorkingExperience.css";

const WorkingExperience = () => {
  const experiences = [
    {
      role: "Production Incharge",
      company: "Sri Jayajothi & Company Private Limited",
      location: "Rajapalayam",
      duration: "01 June 2013 - 01 May 2022",
      experience: "9 Years",
      image: srijayajothiImage,
      type: "company",
    },
    {
      role: "Lecturer - Diploma in Textile Technology",
      company: "P.A.C. Ramasamy Raja Polytechnic College",
      location: "Rajapalayam",
      duration: "01 June 2022 - 07 August 2026",
      experience: "4 Years",
      image: collegeImage,
      type: "college",
    },
  ];

  return (
    <section className="experience-section" id="experience">

      <div className="experience-heading">
        <span className="experience-label">MY EXPERIENCE</span>

        <h2>Working Experience</h2>

        <p>
          My professional experience in textile production and
          education.
        </p>
      </div>

      <div className="experience-container">

        {experiences.map((experience, index) => (
          <div className="experience-card" key={index}>

            <div
              className={`experience-image ${
                experience.type === "college"
                  ? "college-image"
                  : "company-image"
              }`}
            >
              <img
                src={experience.image}
                alt={experience.company}
              />
            </div>

            <div className="experience-content">

              <h3>{experience.role}</h3>

              <h4>{experience.company}</h4>

              <p className="experience-location">
                📍 {experience.location}
              </p>

              <p className="experience-duration">
                {experience.duration}
              </p>

              <span className="experience-badge">
                {experience.experience}
              </span>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default WorkingExperience;