"use client";

import Image from "next/image";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import loginstudents from "../../../public/images/loginstudents.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`/api/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      setError(data.message || "Login failed");
    } else {
      if (data.role === "Student") {
        router.push(`/StudentHome/${data.studentid}`);
      } else if (data.role === "Teacher") {
        router.push(`/TeacherHome/${data.teacherid}`);
      } else {
        router.push("/dashboard");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-xl p-4 sm:p-10 md:p-20 w-[90%] max-w-5xl">
        <div className="flex flex-row rounded-xl overflow-hidden bg-[#D1D4ED] lg:p-10">
          <div className="md:w-1/2 hidden md:block">
            <Image
              src={loginstudents}
              alt="Students learning"
              className="h-full w-full object-cover"
              width={600}
              height={500}
            />
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-white text-center mb-8">
              USER LOGIN
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="flex items-center bg-gray-800 rounded-full mb-4 px-4 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`bg-transparent focus:outline-none text-white w-full `}
                  required
                />
              </div>

              <div className="flex items-center bg-gray-800 rounded-full mb-6 px-4 py-2">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-transparent focus:outline-none text-white w-full  
                  `}
                  required
                />
                <FaLock className="text-gray-400 ml-2" />
              </div>

              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}

              <button
                type="submit"
                className="bg-white text-black font-semibold rounded-full py-2 hover:bg-gray-300 transition duration-300 w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>
            </form>
            <Link href="/Registeras" className="text-center mt-5 underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
