"use client";

import { BookOpenIcon, UserIcon, ClockIcon } from "lucide-react";
import { useState } from "react";

export default function AvailableCourseCard({
  availablecourse,
  studentId,
  enrolledCount,
}) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const maxCoursesReached = enrolledCount >= 5;

  const handleRegister = async () => {
    if (maxCoursesReached) {
      alert("You cannot enroll in more than 5 courses.");
      return;
    }

    setIsRegistering(true);
    try {
      const res = await fetch(`/api/courses/register`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentid: studentId,
          courseid: availablecourse.courseid,
        }),
      });

      if (res.ok) {
        setIsRegistered(true);
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred.");
    }
    setIsRegistering(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <h2 className="text-xs text-indigo-500 font-semibold  uppercase mb-1">
            {availablecourse.coursecode}
          </h2>
          <h1 className="text-xl font-bold text-gray-800">
            {availablecourse.coursename}
          </h1>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            {availablecourse.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-indigo-500" />
            <span>
              <strong>Credit Hours:</strong> {availablecourse.credithours}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-teal-500" />
            <span>
              <strong>Teacher:</strong> {availablecourse.firstname}{" "}
              {availablecourse.lastname}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleRegister}
        disabled={isRegistering || isRegistered || maxCoursesReached}
        className={`mt-6 w-full text-white py-2 px-4 rounded-lg transition duration-200 font-semibold text-sm ${
          isRegistered || maxCoursesReached
            ? "bg-green-500 cursor-not-allowed"
            : "bg-gray-500 hover:bg-gray-700"
        }`}
      >
        {maxCoursesReached
          ? "Limit Reached"
          : isRegistered
          ? "Registered"
          : isRegistering
          ? "Registering..."
          : "Register"}
      </button>
    </div>
  );
}
