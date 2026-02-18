import React from "react";
import StudentNavbar from "../../components/navbars/StudentNavbar";

const Dashboard = () => {

  return (
    <div className="min-h-screen 
    bg-gradient-to-br from-indigo-100 to-purple-200
    dark:from-gray-900 dark:to-black
    transition-all duration-500">

      <StudentNavbar />

      <div className="p-10">

        <h1 className="text-3xl font-bold 
        mb-8 dark:text-white animate-fadeIn">
          Welcome Back 👋
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white dark:bg-gray-800 
          p-6 rounded-xl shadow-lg 
          hover:scale-105 transition">

            <h3 className="text-lg font-semibold dark:text-white">
              Total Exams
            </h3>
            <p className="text-2xl mt-2 dark:text-indigo-400">
              5
            </p>

          </div>

          <div className="bg-white dark:bg-gray-800 
          p-6 rounded-xl shadow-lg 
          hover:scale-105 transition">

            <h3 className="text-lg font-semibold dark:text-white">
              Average Score
            </h3>
            <p className="text-2xl mt-2 dark:text-green-400">
              82%
            </p>

          </div>

          <div className="bg-white dark:bg-gray-800 
          p-6 rounded-xl shadow-lg 
          hover:scale-105 transition">

            <h3 className="text-lg font-semibold dark:text-white">
              AI Confidence
            </h3>
            <p className="text-2xl mt-2 dark:text-pink-400">
              High
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
