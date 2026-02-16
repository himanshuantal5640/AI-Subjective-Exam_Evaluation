import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const PublicNavbar = () => {

  return (
    <nav className="flex justify-between items-center px-6 py-4 
      bg-white dark:bg-gray-800 
      text-black dark:text-white shadow">

      <h1 className="text-lg font-bold">
        AI Exam System
      </h1>

      <div className="flex items-center gap-4">

        <Link to="/" className="hover:text-blue-500">
          Login
        </Link>

        <Link to="/register" className="hover:text-blue-500">
          Register
        </Link>

        <ThemeToggle />

      </div>

    </nav>
  );
};

export default PublicNavbar;
