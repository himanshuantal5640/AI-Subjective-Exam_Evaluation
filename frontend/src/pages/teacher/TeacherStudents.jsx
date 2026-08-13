import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function TeacherStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/users/students")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-green-400">
        Students
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {students.map(student => (
          <div
            key={student._id}
            className="
            bg-white dark:bg-[#071a10]
            border border-gray-200 dark:border-green-500/20
            rounded-2xl p-6 shadow-md
            hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-green-300">
              {student.name}
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              {student.email}
            </p>

            <p className="text-sm mt-2 text-green-600 dark:text-green-400">
              Role: {student.role}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}