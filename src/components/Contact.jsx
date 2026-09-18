import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess(false);
  };

  // =========================
  // FORM VALIDATION
  // =========================
  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject
    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    // Validation error
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    setErrors({});

    // =========================
    // GMAIL COMPOSE
    // =========================

    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&to=" +
      encodeURIComponent("devikamani1512@gmail.com") +
      "&su=" +
      encodeURIComponent(formData.subject.trim()) +
      "&body=" +
      encodeURIComponent(
        `Hello Devika,

Name: ${formData.name.trim()}
Email: ${formData.email.trim()}

Message:
${formData.message.trim()}

Thank you.`
      );

    // Open Gmail compose page
    window.open(gmailUrl, "_blank");

    // Show success message
    setSuccess(true);

    // Clear form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Hide success message after 10 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 50000);
  };

  return (
    <section className="contact-section" id="contact">

      {/* =========================
          HEADING
      ========================== */}
      <div className="contact-heading">

        <span className="contact-label">
          GET IN TOUCH
        </span>

        <h2>
          Let's Work Together
        </h2>

        <p>
          Have a project or opportunity in mind? Feel free to get in touch
          with me.
        </p>

      </div>


      {/* =========================
          CONTACT CONTAINER
      ========================== */}
      <div className="contact-container">

        {/* =========================
            LEFT SIDE
        ========================== */}
        <div className="contact-info">

          <h3>
            Let's Connect
          </h3>

          <p>
            I am always interested in learning new technologies,
            working on frontend projects and exploring new opportunities.
          </p>


          {/* EMAIL */}
          <div className="contact-item">

            <div className="contact-icon">
              ✉
            </div>

            <div>

              <h4>
                Email
              </h4>

              <a href="mailto:devikamani1512@gmail.com">
                devikamani1512@gmail.com
              </a>

            </div>

          </div>


          {/* LOCATION */}
          <div className="contact-item">

            <div className="contact-icon">
              📍
            </div>

            <div>

              <h4>
                Location
              </h4>

              <p>
                Rajapalayam, Tamil Nadu, India
              </p>

            </div>

          </div>


          {/* GITHUB */}
          <div className="contact-item">

            <div className="contact-icon">
              💻
            </div>

            <div>

              <h4>
                GitHub
              </h4>

              <a
                href="https://github.com/devikamani1512-dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Profile
              </a>

            </div>

          </div>


          {/* LINKEDIN */}
          <div className="contact-item">

            <div className="contact-icon">
              in
            </div>

            <div>

              <h4>
                LinkedIn
              </h4>

              <a
                href="https://www.linkedin.com/in/devika-u1503"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>

            </div>

          </div>

        </div>


        {/* =========================
            RIGHT SIDE FORM
        ========================== */}
        <div className="contact-form-box">

          <h3>
            Send Me a Message
          </h3>

          <form
            onSubmit={handleSubmit}
            noValidate
          >

            {/* =========================
                NAME + EMAIL
            ========================== */}
            <div className="form-row">

              {/* NAME */}
              <div className="form-group">

                <label>
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your name"
                  className={errors.name ? "input-error" : ""}
                  onChange={handleChange}
                />

                {errors.name && (
                  <span className="error-message">
                    {errors.name}
                  </span>
                )}

              </div>


              {/* EMAIL */}
              <div className="form-group">

                <label>
                  Your Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  className={errors.email ? "input-error" : ""}
                  onChange={handleChange}
                />

                {errors.email && (
                  <span className="error-message">
                    {errors.email}
                  </span>
                )}

              </div>

            </div>


            {/* =========================
                SUBJECT
            ========================== */}
            <div className="form-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                placeholder="Enter subject"
                className={errors.subject ? "input-error" : ""}
                onChange={handleChange}
              />

              {errors.subject && (
                <span className="error-message">
                  {errors.subject}
                </span>
              )}

            </div>


            {/* =========================
                MESSAGE
            ========================== */}
            <div className="form-group">

              <label>
                Message
              </label>

              <textarea
                rows="6"
                name="message"
                value={formData.message}
                placeholder="Write your message..."
                className={errors.message ? "input-error" : ""}
                onChange={handleChange}
              />

              {errors.message && (
                <span className="error-message">
                  {errors.message}
                </span>
              )}

            </div>


            {/* =========================
                SUCCESS MESSAGE
            ========================== */}
            {success && (
              <div className="success-message">

                <div className="success-icon">
                  ✓
                </div>

                <div>

                  <strong>
                    Message Sent Successfully!
                  </strong>

                  <p>
      Your message has been successfully sent.
I will review the details and get back to you soon.
Thank you for your interest in my profile.
                  </p>

                </div>

              </div>
            )}


            {/* =========================
                SEND BUTTON
            ========================== */}
            <button
              type="submit"
              className="contact-button"
            >
              Send Message →
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default Contact;