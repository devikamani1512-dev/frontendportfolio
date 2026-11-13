import React, { useEffect, useState } from "react";
import "./Projects.css";

import phototypeImage from "../assets/phototype.png";
import foodflowImage from "../assets/foodflow.png";
import grocoImage from "../assets/groco.png";
import hopehandsImage from "../assets/hopehands.png";
import todolistImage from "../assets/todolist.png";
import learningappImage from "../assets/learningapp.png";
import stationaryshopImage from "../assets/stationaryshop.png";
import stepupImage from "../assets/stepup.png";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Backend "image" key -> imported image
const imageMap = {
  phototype: phototypeImage,
  foodflow: foodflowImage,
  groco: grocoImage,
  hopehands: hopehandsImage,
  todolist: todolistImage,
  learnova: learningappImage,
  stationery: stationaryshopImage,
  stepup: stepupImage,
};

// Default projects (backend respond pannala na idhu show aagum)
const defaultProjects = [
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

  {
    title: "To Do List App (Internship)",
    description:
      "A task management app to add, track and complete daily to-dos.",
    technologies: ["REACT", "JAVASCRIPT", "CSS"],
    image: todolistImage,
    link: "https://todolist-waoe.vercel.app/",
  },

  {
    title: "Learnova Learning App",
    description:
      "A learning platform app with courses and a clean, responsive interface.",
    technologies: ["REACT", "JAVASCRIPT", "CSS"],
    image: learningappImage,
    link: "https://learnova-xi-blond.vercel.app/",
  },

  {
    title: "Stationery Shop",
    description:
      "A stationery e-commerce web application built with Django.",
    technologies: ["PYTHON", "DJANGO", "HTML", "CSS"],
    image: stationaryshopImage,
    link: "https://stationaryshop-hazel.vercel.app/",
  },

  {
    title: "StepUp Shoe Ecommerce",
    description:
      "A full stack shoe e-commerce project with a REST API backend and Swagger documentation.",
    technologies: ["DJANGO", "DRF", "POSTGRESQL", "REACT"],
    image: stepupImage,
    link: "https://shoeecommerce-six.vercel.app",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(defaultProjects);

  // Backend la irundhu projects edukkudhu
  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(
  data.map((project) => ({
    ...project,
    image: imageMap[project.image] || project.image,   // <- idha maathunga
  }))
);
        }
      })
      .catch((err) => console.error("Backend not reachable:", err));
  }, []);

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
          A showcase of my full stack and frontend projects, built with React, Python and PostgreSQL.
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