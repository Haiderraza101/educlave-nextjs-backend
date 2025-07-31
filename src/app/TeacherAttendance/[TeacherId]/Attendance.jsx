"use client";

import { useEffect, useState } from "react";

export default function Attendance({ mycourses }) {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [attendenceForm, setAttendenceForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedCourseId) return;
      try {
        const res = await fetch(`/api/students/course/${selectedCourseId}`);
        const data = await res.json();
        setStudents(data);
        setAttendanceStatus({});
      } catch (err) {
        console.error("Failed to fetch students:", err);
        alert("Error loading students.");
      }
    };

    fetchStudents();
  }, [selectedCourseId]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    const records = students.map((student) => ({
      courseid: selectedCourseId,
      studentid: student.studentid,
      date: selectedDate,
      status: attendanceStatus[student.studentid] || "Absent",
    }));

    const res = await fetch(`/api/attendance/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attendanceRecords: records }),
    });

    if (res.ok) {
      alert("Attendance submitted successfully!");
      setAttendenceForm(false);
      setAttendanceStatus({});
    } else {
      alert("Error submitting attendance.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-700">Mark Attendance</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Select a course and date to begin marking attendance.
        </p>
      </div>

      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 space-y-6">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Course</label>
          <select
            value={selectedCourseId}
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              setAttendenceForm(false);
            }}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a course</option>
            {mycourses.map((course) => (
              <option key={course.courseid} value={course.courseid}>
                {course.coursecode} - {course.coursename}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <button
            onClick={() => {
              if (!selectedCourseId) {
                alert("Please select a course first.");
                return;
              }
              setAttendenceForm(true);
            }}
            className="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-800 transition"
          >
            Proceed to Mark Attendance
          </button>
        </div>
      </div>

      {attendenceForm && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow space-y-4 border">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Students in Course
          </h2>

          {students.length === 0 ? (
            <p className="text-gray-500">
              No students enrolled in this course.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-600 uppercase">
                    <tr>
                      <th className="py-2 px-4">#</th>
                      <th className="py-2 px-4">Roll Number</th>
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.studentid} className="border-t">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-8">{student.rollnumber}</td>
                        <td className="py-2 px-4">
                          {student.firstname} {student.lastname}
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex gap-4">
                            {["Present", "Absent", "Late"].map((status) => (
                              <label
                                key={status}
                                className="inline-flex items-center"
                              >
                                <input
                                  type="radio"
                                  name={`status-${student.studentid}`}
                                  value={status}
                                  checked={
                                    attendanceStatus[student.studentid] ===
                                    status
                                  }
                                  onChange={() =>
                                    handleStatusChange(
                                      student.studentid,
                                      status
                                    )
                                  }
                                  className="mr-1"
                                />
                                {status}
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="mt-6 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-800 "
                >
                  Submit Attendance
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
