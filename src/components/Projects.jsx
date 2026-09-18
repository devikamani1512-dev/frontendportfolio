import React from "react";
import "./Projects.css";

import phototypeImage from "../assets/phototype.png";
import foodflowImage from "../assets/foodflow.png";
import grocoImage from "../assets/groco.png";
import hopehandsImage from "../assets/hopehands.png";

const Projects = () => {
  const projects = [
    {
      title: "Phototype Portfolio",
      description:
        "A responsive portfolio website created using HTML, CSS and JavaScript with a clean and user-friendly design.",
      technologies: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
      image: phototypeImage,
      link: "https://devikamani1512-dev.github.io/phototype/",
    },

    {
      title: "FoodFlow Mobile App",
      description:
        "A responsive food and mobile application interface developed using modern frontend technologies.",
      technologies: [
        "HTML",
        "CSS",
        "BOOTSTRAP",
        "JAVASCRIPT",
        "REACT",
        "REACT NATIVE",
        "REACT ROUTER",
      ],
      image: foodflowImage,
      link: "https://foodflow-nine-liart.vercel.app/",
    },

    {
      title: "GroCo Grocery App",
      description:
        "A modern grocery shopping web application with responsive layouts, product categories and a user-friendly interface.",
      technologies: [
        "HTML",
        "CSS",
        "BOOTSTRAP",
        "JAVASCRIPT",
        "REACT",
        "REACT ROUTER",
      ],
      image: grocoImage,
      link: "https://groceryapp-one.vercel.app/",
    },

    {
      title: "HopeHands Charity Website",
      description:
        "A responsive charity website with causes, donation, volunteer and contact sections designed for a smooth user experience.",
      technologies: [
        "HTML",
        "CSS",
        "BOOTSTRAP",
        "JAVASCRIPT",
        "REACT",
        "REACT ROUTER",
      ],
      image: hopehandsImage,
      link: "https://charityproject-two.vercel.app/",
    },
  ];

  return (
    <section className="projects-section" id="projects">

      {/* ================================
          PROJECTS HEADING
      ================================= */}

      <div className="projects-heading">

        <span className="projects-label">
          MY WORK
        </span>

        <h2>My Projects</h2>

        <p>
          A showcase of my recent frontend projects and practical
          development work.
        </p>

      </div>


      {/* ================================
          PROJECT CARDS
      ================================= */}

      <div className="projects-container">

        {projects.map((project, index) => (
          <div className="project-card" key={index}>

            {/* PROJECT IMAGE */}
            <div className="project-image">

              <img
                src={project.image}
                alt={project.title}
              />

            </div>


            {/* PROJECT CONTENT */}
            <div className="project-content">

              <h3>
                {project.title}
              </h3>

              <p>
                {project.description}
              </p>


              {/* TECHNOLOGIES */}
              <div className="project-tags">

                {project.technologies.map(
                  (technology, techIndex) => (
                    <span key={techIndex}>
                      {technology}
                    </span>
                  )
                )}

              </div>


              {/* VIEW PROJECT */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View Project →
              </a>

            </div>

          </div>
        ))}

      </div>


      {/* =================================================
          PROJECT SHOWCASE
      ================================================== */}

      <div className="project-showcase">

        {/* SHOWCASE HEADING */}
        <div className="showcase-heading">

          <span>
            PROJECT SHOWCASE
          </span>

          <h2>
            Explore My Projects
          </h2>

          <p>
            Take a quick look at my projects and explore them live.
          </p>

        </div>


        {/* SCROLLING PROJECTS */}
        <div className="showcase-marquee">

          <div className="showcase-track">

            {[...projects, ...projects].map(
              (project, index) => (

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="showcase-card"
                  key={index}
                >

                  <img
                    src={project.image}
                    alt={project.title}
                  />


                  <div className="showcase-overlay">

                    <h3>
                      {project.title}
                    </h3>

                    <span>
                      View Project →
                    </span>

                  </div>

                </a>

              )
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Projects;