"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FiBook,
  FiUserCheck,
  FiClipboard,
  FiFileText,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Sidebar() {
  const router = useRouter();
  const { StudentId } = useParams();
  const [activeLink, setActiveLink] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    { name: "Dashboard", href: `/StudentHome/${StudentId}`, icon: <FiBook /> },
    { name: "Courses", href: `/StudentCourses/${StudentId}`, icon: <FiBook /> },
    {
      name: "Attendance",
      href: `/StudentAttendance/${StudentId}`,
      icon: <FiUserCheck />,
    },
    {
      name: "Marks",
      href: `/StudentMarks/${StudentId}`,
      icon: <FiClipboard />,
    },
    {
      name: "Transcript",
      href: `/StudentTranscript/${StudentId}`,
      icon: <FiFileText />,
    },
  ];

  const handleLogout = () => {
    router.push("/LoginPage");
  };

  return (
    <div>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-blue-500"
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 lg:fixed lg:translate-x-0 lg:h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700 mt-5 lg:mt-0">
          Educlave
        </div>

        <nav className="flex-1 mt-6">
          <ul>
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center px-6 py-3 text-sm hover:bg-gray-800 transition-all duration-200 ${
                    activeLink === link.name ? "bg-gray-800" : ""
                  }`}
                  onClick={() => {
                    setActiveLink(link.name);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 text-sm hover:bg-red-600 transition-all duration-200 border-t border-gray-700 w-full"
        >
          <FiLogOut className="mr-3 text-lg" /> Logout
        </button>
      </div>
    </div>
  );
}
