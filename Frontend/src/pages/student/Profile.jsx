import React from "react";
import StudentNavbar from "../../components/navbars/StudentNavbar";

const Profile = () => {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      <StudentNavbar />

      <div className="flex justify-center mt-10">

        <div className="bg-white dark:bg-gray-800 
        p-8 rounded-xl shadow-xl w-96
        dark:text-white">

          <h2 className="text-xl font-bold mb-4">
            My Profile
          </h2>

          <p><strong>Name:</strong> Himanshu</p>
          <p><strong>Email:</strong> example@gmail.com</p>
          <p><strong>Role:</strong> Student</p>

        </div>

      </div>

    </div>
  );
};

export default Profile;
