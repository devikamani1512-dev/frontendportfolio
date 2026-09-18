import React from "react";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import WorkingExperience from "./components/WorkingExperience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import CurrentlyBuilding from "./components/CurrentlyBuilding";

import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <WorkingExperience />
      <Testimonials />
      <Contact />
      <CurrentlyBuilding />

      <Footer />
    </>
  );
}

export default App;