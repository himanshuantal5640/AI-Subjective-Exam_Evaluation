import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle";

const StudentNavbar = () => {

  const { logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between px-8 py-4 
    bg-white dark:bg-gray-800 shadow">

      <h1 className="font-bold text-lg dark:text-white">
        Student Panel
      </h1>

      <div className="flex gap-6 items-center 
      dark:text-white">

        <Link to="/student/dashboard">
          Dashboard
        </Link>

        <Link to="/student/profile">
          Profile
        </Link>

        <button onClick={logout}>
          Logout
        </button>

        <ThemeToggle />

      </div>

    </nav>
  );
};

export default StudentNavbar;
