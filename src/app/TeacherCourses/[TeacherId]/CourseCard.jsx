"use client";

import { BookOpenIcon, UserIcon, ClockIcon } from "lucide-react";
import { useState } from "react";

export default function CourseCard({ course }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/courses/delete/${course.courseid}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setIsDeleted(true);
      } else {
        alert("Failed to delete course.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
    setIsDeleting(false);
  };

  if (isDeleted) return null;
  return (
    <div className="bg-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200">
      <div className="mb-4">
        <h2 className="text-sm text-gray-500 uppercase mb-1">
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
        onClick={handleDelete}
        disabled={isDeleting}
        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-200 font-semibold text-sm"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
