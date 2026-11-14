import React from "react";
import "./About.css";

import profilePhoto from "../assets/profilephoto.jpg";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* ================================
            LEFT CONTENT
        ================================= */}
        <div className="about-content">

          <div className="about-title-row">
            <span className="about-number">01</span>

            <h2>
              Building Digital
              <br />
              Experiences.
            </h2>
          </div>

          <p>
           I am a Full Stack Developer trained in Generative AI. I build responsive, user-friendly web applications with React on the frontend and Python, Django and FastAPI on the backend, with PostgreSQL for data storage.
          </p>

          <p>
            I enjoy taking an idea from design to deployment, building REST APIs, authentication and admin dashboards along with clean interfaces. I am continuously improving my skills in React, Python and modern web technologies to build practical digital solutions.
          </p>

          {/* ================================
              ABOUT DETAILS
          ================================= */}
          <div className="about-details">

            <div className="about-detail-row">
              <span>Role</span>
              <p>Full Stack & Gen AI Developer</p>
            </div>

            <div className="about-detail-row">
              <span>Focus</span>
              <p>Full Stack Development & Generative AI</p>
            </div>

            <div className="about-detail-row">
              <span>Based In</span>
              <p>India</p>
            </div>

          </div>

          {/* ================================
              WHY HIRE ME + PROJECT CTA
          ================================= */}
          <div className="about-bottom-box">

            {/* ================================
                WHY HIRE ME CARD
            ================================= */}
            <div className="why-hire">

              <div className="why-hire-title">

                <div className="why-hire-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    <circle
                      cx="12"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <h3>Why Hire Me?</h3>

              </div>

              <div className="why-hire-list">

                <div className="why-hire-item">
                  <span>✓</span>
                  <p>
                    Strong practical experience in textile industry &amp;
                    education
                  </p>
                </div>

                <div className="why-hire-item">
                  <span>✓</span>
                  <p>
                    Full stack development with React, FastAPI and PostgreSQL
                  </p>
                </div>

                <div className="why-hire-item">
                  <span>✓</span>
                  <p>
                    Built and deployed full stack apps with REST APIs
                  </p>
                </div>

                <div className="why-hire-item">
                  <span>✓</span>
                  <p>
                    Quick learner with continuous improvement mindset
                  </p>
                </div>

              </div>

            </div>

            {/* ================================
                HAVE A PROJECT IN MIND CARD
            ================================= */}
            <div className="about-cta">

              <div className="cta-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2L11 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="cta-content">

                <h3>Have a project in mind?</h3>

                <p>
                  Let's build something meaningful together.
                </p>

                <div className="cta-buttons">

                  {/* HIRE ME */}
                  <a
                    href="#contact"
                    className="hire-btn"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4H20V20H4V4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />

                      <path
                        d="M4 7L12 13L20 7"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>

                    <span>Hire Me</span>
                  </a>

                  {/* SEND MESSAGE */}
                  <a
                    href="#contact"
                    className="message-btn"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 11.5C20 15.6421 16.4183 19 12 19C10.8908 19 9.83674 18.7897 8.89443 18.4096L4 20L5.4312 15.8735C4.53174 14.6618 4 13.1395 4 11.5C4 7.35786 7.58172 4 12 4C16.4183 4 20 7.35786 20 11.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>Send a Message</span>
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================================
            RIGHT PROFILE CARD
        ================================= */}
        <div className="about-profile-card">

          <div className="about-profile-image">
            <img
              src={profilePhoto}
              alt="Devika Manikandan"
            />
          </div>

          <div className="about-profile-info">

            <h3>Devika Manikandan</h3>

            <p>
              Gen AI Python Full Stack Developer
            </p>

          </div>

          {/* ================================
              SOCIAL LINKS
          ================================= */}
          <div className="about-social">

            {/* GitHub */}
            <a
              href="https://github.com/devikamani1512-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.26C2 16.79 4.87 20.63 8.84 22C9.34 22.1 9.52 21.78 9.52 21.5C9.52 21.25 9.51 20.58 9.5 19.69C6.73 20.31 6.14 18.31 6.14 18.31C5.68 17.08 5.03 16.75 5.03 16.75C4.12 16.11 5.1 16.13 5.1 16.13C6.1 16.2 6.63 17.19 6.63 17.19C7.53 18.79 8.99 18.33 9.54 18.06C9.63 17.39 9.89 16.94 10.18 16.69C7.97 16.43 5.64 15.55 5.64 11.7C5.64 10.6 6.02 9.7 6.65 8.99C6.55 8.74 6.2 7.72 6.74 6.35C6.74 6.35 7.59 6.07 9.5 7.39C10.31 7.16 11.15 7.04 12 7.03C12.85 7.04 13.69 7.16 14.5 7.39C16.41 6.07 17.26 6.35 17.26 6.35C17.8 7.72 17.45 8.74 17.35 8.99C17.98 9.7 18.36 10.6 18.36 11.7C18.36 15.56 16.03 16.42 13.81 16.68C14.17 17 14.5 17.63 14.5 18.58C14.5 19.94 14.49 21.04 14.49 21.5C14.49 21.78 14.67 22.1 15.17 22C19.13 20.63 22 16.79 22 12.26C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/devika-u1503"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.94 8.5H3.56V20H6.94V8.5ZM5.25 3C4.17 3 3.3 3.87 3.3 4.95C3.3 6.03 4.17 6.9 5.25 6.9C6.33 6.9 7.2 6.03 7.2 4.95C7.2 3.87 6.33 3 5.25 3ZM20.7 13.41C20.7 9.95 18.85 8.17 16.35 8.17C14.33 8.17 13.42 9.28 12.91 10.06V8.5H9.53V20H12.91V14.3C12.91 12.8 13.2 11.34 15.08 11.34C16.93 11.34 16.96 13.07 16.96 14.4V20H20.34L20.7 13.41Z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=devikamani1512@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M3 7L12 13L21 7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;