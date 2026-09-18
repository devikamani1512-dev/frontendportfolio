import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const themeRef = useRef(null);

  const themes = [
    { name: "Light", color: "#ff5a00", type: "light" },
    { name: "Dark", color: "#ff5a00", type: "dark" },
    { name: "Blue", color: "#2563eb", type: "blue" },
    { name: "Green", color: "#16a34a", type: "green" },
    { name: "Purple", color: "#9333ea", type: "purple" },
    { name: "Pink", color: "#ec4899", type: "pink" },
    { name: "Teal", color: "#0d9488", type: "teal" },
    { name: "Orange", color: "#ff5a00", type: "orange" },
  ];

  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme.type);

    setDarkMode(theme.type === "dark");
    setThemeOpen(false);

    localStorage.setItem("portfolio-theme", theme.type);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;

    if (newMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("portfolio-theme", "light");
    }

    setDarkMode(newMode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setDarkMode(savedTheme === "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        themeRef.current &&
        !themeRef.current.contains(event.target)
      ) {
        setThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* Logo */}
        <a href="#home" className="logo">
          Devika<span>.</span>
        </a>

        {/* Navigation */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          <a href="#skills" onClick={() => setMenuOpen(false)}>
            Skills
          </a>

          <a href="#projects" onClick={() => setMenuOpen(false)}>
            Projects
          </a>

          <a href="#education" onClick={() => setMenuOpen(false)}>
            Education
          </a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>
  Experience
</a>

<a href="#testimonials" onClick={() => setMenuOpen(false)}>
  Testimonials
</a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>

        </div>

        {/* Theme Section */}
        <div className="theme-area" ref={themeRef}>

          {/* Half Moon Toggle */}
          <button
            className={`theme-toggle ${darkMode ? "dark" : ""}`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <span className="toggle-sun">☀</span>
            <span className="toggle-moon">☾</span>
            <span className="toggle-circle"></span>
          </button>

          {/* Theme Options Button */}
          <button
            className="theme-menu-btn"
            onClick={() => setThemeOpen(!themeOpen)}
          >
            🎨
          </button>

          {/* Theme Dropdown */}
          {themeOpen && (
            <div className="theme-dropdown">

              <h3>Choose Theme Color</h3>

              {themes.map((theme) => (
                <button
                  key={theme.name}
                  className="theme-option"
                  onClick={() => changeTheme(theme)}
                >
                  <span
                    className="theme-dot"
                    style={{ backgroundColor: theme.color }}
                  ></span>

                  <span>{theme.name}</span>

                  {theme.type === "light" && (
                    <span className="theme-icon">☀</span>
                  )}

                  {theme.type === "dark" && (
                    <span className="theme-icon">☾</span>
                  )}
                </button>
              ))}

            </div>
          )}

        </div>

        {/* Mobile Menu */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

    </nav>
  );
};

export default Navbar;