import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      text: "She demonstrated strong knowledge of textile production processes and handled her responsibilities with dedication. Her practical experience in production and ability to manage day-to-day operations were valuable to the team.",
      name: "Textile Industry Professional",
      role: "Sri Jayajothi & Company Private Limited",
    },
    {
      text: "She was dedicated and responsible in teaching Diploma in Textile Technology. Her practical knowledge and ability to explain textile concepts clearly helped students understand both technical and practical aspects.",
      name: "Academic Professional",
      role: "P.A.C. Ramasamy Raja Polytechnic College",
    },
    {
      text: "Her journey from textile production to textile education reflects her willingness to learn, adapt and share her knowledge. She has demonstrated commitment, discipline and a continuous interest in professional development.",
      name: "Professional Mentor",
      role: "Career & Development",
    },
  ];

  return (
    <section className="testimonials-section" id="testimonials">

      {/* Heading */}
      <div className="testimonials-heading">
        <span className="testimonials-label">
          TESTIMONIALS
        </span>

        <h2>What People Say About My Work</h2>

        <p>
          Professional feedback based on my experience in textile
          production and education.
        </p>
      </div>

      {/* Cards */}
      <div className="testimonials-container">

        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>

            {/* Quotation */}
            <div className="testimonial-quote">
              “
            </div>

            {/* Testimonial Text */}
            <p className="testimonial-text">
              {testimonial.text}
            </p>

            {/* Author Card */}
            <div className="testimonial-author">

              <h4>{testimonial.name}</h4>

              <p>{testimonial.role}</p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Testimonials;