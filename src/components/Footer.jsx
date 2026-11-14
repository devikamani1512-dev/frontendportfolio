import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">

      {/* ================================
          FOOTER MAIN
      ================================= */}

      <div className="footer-main">

        {/* BRAND */}
        <div className="footer-brand">

          <h2>
            Devika<span>.</span>
          </h2>

          <p>
             Full Stack &amp; Gen AI Developer building responsive and user-friendly
  digital experiences.
          </p>

        </div>


        {/* ================================
            QUICK LINKS
        ================================= */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#home">Home</a>

          <a href="#about">About</a>

          <a href="#skills">Skills</a>

          <a href="#projects">Projects</a>

          <a href="#education">Education</a>

          <a href="#experience">Experience</a>

          <a href="#testimonials">Testimonials</a>

          <a href="#contact">Contact</a>

          <a href="#currently-building">
            Currently Building
          </a>

        </div>


        {/* ================================
            CONNECT WITH ME
        ================================= */}

        <div className="footer-connect">

          <h3>Connect With Me</h3>

          <div className="footer-socials">

            {/* GitHub */}
            <a
              href="https://github.com/devikamani1512-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GH
            </a>


            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/devika-u1503"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>


            {/* Email */}
            <a
              href="mailto:devikamani1512@gmail.com"
              aria-label="Email"
            >
              @
            </a>

          </div>

        </div>

      </div>


      {/* ================================
          FOOTER BOTTOM
      ================================= */}

      <div className="footer-bottom">

        <p>
          © 2026 Devika. All Rights Reserved.
        </p>

        <p>
           Built with React, FastAPI &amp; PostgreSQL
        </p>

      </div>

    </footer>
  );
};

export default Footer;