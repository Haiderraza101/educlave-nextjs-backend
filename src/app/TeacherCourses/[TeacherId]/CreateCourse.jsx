"use client";
import { useState } from "react";

export default function CreateCourse({ teacherId }) {
  const [showform, setshowform] = useState(false);
  const [formData, setFormData] = useState({
    coursecode: "",
    coursename: "",
    description: "",
    credithours: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    console.log("teacher id ", teacherId);
    const response = await fetch(`/api/courses/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        teacherid: teacherId,
      }),
    });

    if (response.ok) {
      alert("Course created successfully!");
      setFormData({
        coursecode: "",
        coursename: "",
        description: "",
        credithours: "",
      });
      setshowform(false);
    } else {
      alert("Failed to create course.");
    }
  };

  return (
    <div className="text-center">
      <button
        className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-800"
        onClick={() => setshowform(!showform)}
      >
        {showform ? "Cancel" : "Create Course"}
      </button>

      {showform && (
        <form
          onSubmit={handleCreateCourse}
          className="bg-white shadow p-6 mt-6 rounded-xl space-y-4 border border-gray-200 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="coursecode"
              value={formData.coursecode}
              onChange={handleInputChange}
              placeholder="Course Code"
              className="border p-3 rounded w-full"
              required
            />
            <input
              type="text"
              name="coursename"
              value={formData.coursename}
              onChange={handleInputChange}
              placeholder="Course Name"
              className="border p-3 rounded w-full"
              required
            />
            <input
              type="number"
              name="credithours"
              value={formData.credithours}
              onChange={handleInputChange}
              placeholder="Credit Hours"
              className="border p-3 rounded w-full"
              required
            />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Course Description"
            className="border p-3 rounded w-full"
            rows={3}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
