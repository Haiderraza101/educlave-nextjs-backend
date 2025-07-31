"use client";
import { useState } from "react";
import Error from "./error";

export default function RegistrationForm() {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    rollNumber: "",
    firstName: "",
    lastName: "",
    dob: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    guardianName: "",
    guardianContact: "",
    guardianRelation: "",
    enrollmentDate: "",
    semester: "",
    program: "",
    department: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (formdata.password !== formdata.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`/api/students/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Student registered successfully!");
        setFormdata({
          username: "",
          password: "",
          confirmPassword: "",
          rollNumber: "",
          firstName: "",
          lastName: "",
          dob: "",
          age: "",
          gender: "",
          contact: "",
          email: "",
          address: "",
          guardianName: "",
          guardianContact: "",
          guardianRelation: "",
          enrollmentDate: "",
          semester: "",
          program: "",
          department: "",
        });
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };

  const fields = [
    "username",
    "password",
    "confirmPassword",
    "rollNumber",
    "firstName",
    "lastName",
    "dob",
    "age",
    "gender",
    "contact",
    "email",
    "address",
    "guardianName",
    "guardianContact",
    "guardianRelation",
    "enrollmentDate",
    "semester",
    "program",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-6xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-400 mb-10 underline">
          Student Registration Form
        </h1>
        {error && <Error error={error} />}
        {message && (
          <p className="text-center text-green-600 font-medium mb-4">
            {message}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {fields.map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                name={field}
                type={
                  field.toLowerCase().includes("password")
                    ? "password"
                    : field.toLowerCase().includes("dob")
                    ? "date"
                    : field.toLowerCase().includes("date")
                    ? "date"
                    : field.toLowerCase().includes("email")
                    ? "email"
                    : field.toLowerCase().includes("age") ||
                      field.toLowerCase().includes("contact") ||
                      field.toLowerCase().includes("semester")
                    ? "number"
                    : "text"
                }
                value={formdata[field]}
                onChange={handleChange}
                placeholder={field}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              name="department"
              value={formdata.department}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Mechatronics">Mechatronics</option>
            </select>
          </div>

          <div className="col-span-full text-center mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-cyan-600 text-white font-semibold rounded-xl hover:bg-cyan-800 transition duration-300 shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
