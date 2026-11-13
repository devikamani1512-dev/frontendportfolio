import React, { useEffect, useState } from "react";

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
import Admin from "./components/Admin";

import Footer from "./components/Footer";

import "./App.css";

function App() {
  // URL kadaisila #admin irundha mattum Admin page kaattum
  const [isAdmin, setIsAdmin] = useState(window.location.hash === "#admin");

  useEffect(() => {
    const onHashChange = () =>
      setIsAdmin(window.location.hash === "#admin");

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (isAdmin) {
    return <Admin />;
  }

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