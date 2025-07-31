"use client";

import { useEffect, useState } from "react";

export default function UploadGrades({ mycourses }) {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [gradeform, setgradeform] = useState(false);
  const [students, setStudents] = useState([]);
  const [grades, setgrades] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedCourseId) return;
      try {
        const res = await fetch(`/api/students/course/${selectedCourseId}`);
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        alert("Error loading students.");
      }
    };

    fetchStudents();
  }, [selectedCourseId]);

  useEffect(() => {
    const fetchGrades = async () => {
      if (!selectedCourseId) return;
      try {
        const res = await fetch(`/api/grades/getgrades/${selectedCourseId}`);
        const data = await res.json();

        const gradeMap = {};
        data.forEach((item) => {
          gradeMap[item.studentid] = {
            obtainedgrandtotal: item.obtainedgrandtotal,
            lettergrade: item.lettergrade,
          };
        });

        setgrades(gradeMap);
      } catch (err) {
        console.error("Failed to fetch Grades:", err);
        alert("Error loading Grades.");
      }
    };

    fetchGrades();
  }, [selectedCourseId]);

  const handlesubmitgrades = async () => {
    if (!selectedCourseId || students.length === 0) return;

    const course = mycourses.find((c) => c.courseid == selectedCourseId);

    if (!course) {
      alert("Course info not found.");
      return;
    }

    const transcripts = students
      .filter((student) => grades[student.studentid]?.lettergrade)
      .map((student) => ({
        studentid: student.studentid,
        courseid: course.courseid,
        coursecode: course.coursecode,
        coursename: course.coursename,
        credithours: course.credithours || 3,
        semester: student.currentsemester,
        year: student.year,
        lettergrade: grades[student.studentid].lettergrade,
      }));

    try {
      const res = await fetch(`/api/grades/transcripts/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transcripts),
      });

      if (res.ok) {
        alert("Grades submitted to transcripts successfully.");
      } else {
        const errData = await res.json();
        console.error(errData);
        alert("Failed to submit transcripts.");
      }
    } catch (err) {
      console.error("Error submitting transcripts:", err);
      alert("Error occurred while submitting transcripts.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-700">Upload Grades</h1>
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
              setgradeform(false);
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
          <button
            onClick={() => {
              if (!selectedCourseId) {
                alert("Please select a course first.");
                return;
              }
              setgradeform(true);
            }}
            className="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-800 transition"
          >
            Proceed to Mark Attendance
          </button>
        </div>
      </div>
      {gradeform && (
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
                      <th className="py-2 px-4">Obtained Absolutes</th>
                      <th className="py-2 px-4">Grade</th>
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
                        <td className="py-2 px-18">
                          {grades[student.studentid]?.obtainedgrandtotal ??
                            "N/A"}
                        </td>
                        <td className="py-2 px-8">
                          {grades[student.studentid]?.lettergrade ?? "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div onClick={handlesubmitgrades} className="text-center">
                <button className="mt-6 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-800 ">
                  Submit Grades
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
