"use client";
import { useState, useEffect } from "react";

export default function StudentAttendance({ mycourses, studentId }) {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!selectedCourseId) return;

      try {
        const res = await fetch(
          `/api/attendance/student/${studentId}/${selectedCourseId}`
        );
        const data = await res.json();
        setAttendanceRecords(data);

        const total = data.length;
        const presentCount = data.filter(
          (count) => count.status === "Present"
        ).length;
        const percentage =
          total > 0 ? Math.round((presentCount / total) * 100) : 0;
        setAttendancePercentage(Number(percentage));
      } catch (err) {
        console.error("Failed to load attendance:", err);
        alert("Error loading attendance data.");
      }
    };

    fetchAttendance();
  }, [selectedCourseId, studentId]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-700">My Attendance</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Select a course to view your attendance records.
        </p>
      </div>

      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 space-y-6">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Course</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
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

        {selectedCourseId && (
          <div className="mt-4 space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-xl font-semibold text-gray-700">
                Attendance:{" "}
                <span
                  className={`font-bold ${
                    attendancePercentage >= 75
                      ? "text-green-600"
                      : attendancePercentage >= 50
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {attendancePercentage !== null
                    ? `${attendancePercentage}%`
                    : "--"}
                </span>
              </p>
            </div>

            {attendanceRecords.length === 0 ? (
              <p className="text-gray-500 text-center mt-6">
                No attendance records found for this course.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border rounded">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="py-2 px-4">#</th>
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record, index) => (
                      <tr key={record.date} className="border-t">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">
                          {new Date(record.date).toISOString().split("T")[0]}
                        </td>
                        <td className="py-2 px-4">
                          <span
                            className={`px-3 py-1  text-xs font-semibold
                           `}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
