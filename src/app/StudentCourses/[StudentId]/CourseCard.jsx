"use client";

import { BookOpenIcon, UserIcon, ClockIcon } from "lucide-react";
import { useState } from "react";
export default function CourseCard({ course, studentId }) {
  const [isdroping, setIsdroping] = useState(false);
  const [isdroped, setIsdroped] = useState(false);

  const handledrop = async () => {
    console.log(course.courseid);
    setIsdroping(true);
    try {
      const res = await fetch(`/api/courses/drop`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseid: course.courseid,
        }),
      });

      if (res.ok) {
        setIsdroped(true);
      } else {
        alert("Droping of Course Failed.");
      }
    } catch (error) {
      console.error("error:", error);
      alert("An error occurred.");
    }
    setIsdroping(false);
  };

  return (
    <div className=" bg-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 ">
      <div className="mb-4">
        <h2 className="text-sm text-gray-500  uppercase mb-1">
          {course.coursecode}
        </h2>
        <h1 className="text-2xl font-bold text-gray-800">
          {course.coursename}
        </h1>
        <p className="text-gray-600 mt-2 text-sm">{course.description}</p>
      </div>

      <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-indigo-500" />
          <span>
            <strong>Credit Hours:</strong> {course.credithours}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4 text-teal-500" />
          <span>
            <strong>Teacher:</strong> {course.firstname} {course.lastname}
          </span>
        </div>
      </div>
      <button
        onClick={handledrop}
        disabled={isdroping || isdroped}
        className={`mt-6 w-full text-white py-2 px-4 rounded-lg transition duration-200 font-semibold text-sm ${
          isdroped
            ? "bg-red-500 cursor-not-allowed"
            : "bg-gray-500 hover:bg-gray-700"
        }`}
      >
        {isdroped ? "Droped" : isdroping ? "Droping..." : "Drop"}
      </button>
    </div>
  );
}
