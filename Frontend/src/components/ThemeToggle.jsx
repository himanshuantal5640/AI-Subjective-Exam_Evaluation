import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {

  const { theme, toggleTheme } =
    useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 border rounded"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
