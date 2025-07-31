"use client";
import { useEffect, useState } from "react";

export default function Marks({ mycourses, StudentId }) {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [quizmarks, setquizmarks] = useState([]);
  const [assignmentmarks, setassignmentmarks] = useState([]);
  const [midmarks, setmidmarks] = useState([]);
  const [finalmarks, setfinalmarks] = useState([]);

  useEffect(() => {
    const fetchquizmarks = async () => {
      if (!selectedCourseId) return;

      try {
        const res = await fetch(
          `/api/quizzes/quizmarks/${StudentId}/${selectedCourseId}`
        );
        const data = await res.json();
        setquizmarks(data);
      } catch (err) {
        console.error("Failed to load Quiz Marks", err);
        alert("Error loading Quiz Marks");
      }
    };
    fetchquizmarks();
  }, [selectedCourseId, StudentId]);

  useEffect(() => {
    const fetchassignmentmarks = async () => {
      if (!selectedCourseId) {
        return;
      }
      try {
        const res = await fetch(
          `/api/assignments/assignmentmarks/${StudentId}/${selectedCourseId}`
        );

        const data = await res.json();
        setassignmentmarks(data);
      } catch (err) {
        console.error("Failed to load Assignment Marks", err);
        alert("Error Loading Assignment Marks");
      }
    };
    fetchassignmentmarks();
  }, [selectedCourseId, StudentId]);

  useEffect(() => {
    const fetchmidmarks = async () => {
      if (!selectedCourseId) {
        return;
      }
      try {
        const res = await fetch(
          `/api/mids/midmarks/${StudentId}/${selectedCourseId}`
        );

        const data = await res.json();
        setmidmarks(data);
      } catch (err) {
        console.error("Failed to load Mid Marks", err);
        alert("Error Loading Mid Marks");
      }
    };
    fetchmidmarks();
  }, [selectedCourseId, StudentId]);

  useEffect(() => {
    const fetchfinalmarks = async () => {
      if (!selectedCourseId) {
        return;
      }
      try {
        const res = await fetch(
          `/api/finals/finalmarks/${StudentId}/${selectedCourseId}`
        );

        const data = await res.json();
        setfinalmarks(data);
      } catch (err) {
        console.error("Failed to load Final Marks", err);
        alert("Error Loading Final Marks");
      }
    };
    fetchfinalmarks();
  }, [selectedCourseId, StudentId]);

  const quizAbsolute = quizmarks.length
    ? (
        (quizmarks
          .filter((q) => q.quiznumber !== null)
          .reduce((sum, q) => sum + Number(q.obtainedmarks), 0) /
          quizmarks
            .filter((q) => q.quiznumber !== null)
            .reduce((sum, q) => sum + Number(q.totalmarks), 0)) *
        10
      ).toFixed(2)
    : "0.00";

  const assignmentAbsolute = assignmentmarks.length
    ? (
        (assignmentmarks
          .filter((a) => a.assignmentnumber !== null)
          .reduce((sum, a) => sum + Number(a.obtainedmarks), 0) /
          assignmentmarks
            .filter((a) => a.assignmentnumber !== null)
            .reduce((sum, a) => sum + Number(a.totalmarks), 0)) *
        10
      ).toFixed(2)
    : "0.00";

  const midAbsolute = midmarks.length
    ? (
        (midmarks
          .filter((m) => m.midnumber !== null)
          .reduce((sum, m) => sum + Number(m.obtainedmarks), 0) /
          midmarks
            .filter((m) => m.midnumber !== null)
            .reduce((sum, m) => sum + Number(m.totalmarks), 0)) *
        30
      ).toFixed(2)
    : "0.00";

  const finalAbsolute = finalmarks.length
    ? (
        (finalmarks.reduce((sum, f) => sum + Number(f.obtainedmarks), 0) /
          finalmarks.reduce((sum, f) => sum + Number(f.totalmarks), 0)) *
        50
      ).toFixed(2)
    : "0.00";

  const grandTotalObtainedAbsolute = (
    parseFloat(quizAbsolute) +
    parseFloat(assignmentAbsolute) +
    parseFloat(midAbsolute) +
    parseFloat(finalAbsolute)
  ).toFixed(2);
  const grandTotalOutOf = 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-700">Marks</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Select a course to view your assessment marks
        </p>
      </div>

      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-10">
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
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Quiz Marks</h2>
            {quizmarks.filter((q) => q.quiznumber !== null).length === 0 ? (
              <p className="text-gray-500 italic">No marks uploaded yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-gray-700 text-sm">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">#</th>
                      <th className="py-3 px-4 border-b text-left">
                        Obtained Marks
                      </th>
                      <th className="py-3 px-4 border-b text-left">
                        Total Marks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizmarks
                      .filter((q) => q.quiznumber !== null)
                      .map((q, index) => (
                        <tr key={index} className="text-sm hover:bg-gray-50">
                          <td className="py-2 px-4 border-t">{q.quiznumber}</td>
                          <td className="py-2 px-4 border-t">
                            {q.obtainedmarks}
                          </td>
                          <td className="py-2 px-4 border-t">{q.totalmarks}</td>
                        </tr>
                      ))}
                    <tr className="bg-gray-50 font-semibold text-sm">
                      <td className="py-2 px-4 border-t text-right" colSpan={1}>
                        Totals:
                      </td>
                      <td className="py-2 px-4 border-t">
                        {quizmarks
                          .filter((q) => q.quiznumber !== null)
                          .reduce((sum, q) => sum + Number(q.obtainedmarks), 0)}
                      </td>
                      <td className="py-2 px-4 border-t">
                        {quizmarks
                          .filter((q) => q.quiznumber !== null)
                          .reduce((sum, q) => sum + Number(q.totalmarks), 0)}
                      </td>
                    </tr>
                    <tr className="bg-gray-100 font-bold text-sm">
                      <td className="py-2 px-4 border-t text-right" colSpan={3}>
                        Obtained Absolute:{" "}
                        {(
                          (quizmarks
                            .filter((q) => q.quiznumber !== null)
                            .reduce(
                              (sum, q) => sum + Number(q.obtainedmarks),
                              0
                            ) /
                            quizmarks
                              .filter((q) => q.quiznumber !== null)
                              .reduce(
                                (sum, q) => sum + Number(q.totalmarks),
                                0
                              )) *
                          10
                        ).toFixed(2)}{" "}
                        / 10
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              Assignment Marks
            </h2>
            {assignmentmarks.length === 0 ? (
              <p className="text-gray-500 italic">No marks uploaded yet</p>
            ) : (
              <table className="min-w-full bg-white shadow-md border border-gray-200 rounded-lg">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">#</th>
                    <th className="py-3 px-4 border-b text-left">
                      Obtained Marks
                    </th>
                    <th className="py-3 px-4 border-b text-left">
                      Total Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentmarks
                    .filter((a) => a.assignmentnumber !== null)
                    .map((a, index) => (
                      <tr key={index} className="text-sm hover:bg-gray-50">
                        <td className="py-2 px-4 border-t">
                          {a.assignmentnumber}
                        </td>
                        <td className="py-2 px-4 border-t">
                          {a.obtainedmarks}
                        </td>
                        <td className="py-2 px-4 border-t">{a.totalmarks}</td>
                      </tr>
                    ))}
                  <tr className="bg-gray-50 font-semibold text-sm">
                    <td className="py-2 px-4 border-t text-right" colSpan={1}>
                      Totals:
                    </td>
                    <td className="py-2 px-4 border-t">
                      {assignmentmarks
                        .filter((a) => a.assignmentnumber !== null)
                        .reduce((sum, a) => sum + Number(a.obtainedmarks), 0)}
                    </td>
                    <td className="py-2 px-4 border-t">
                      {assignmentmarks
                        .filter((a) => a.assignmentnumber !== null)
                        .reduce((sum, a) => sum + Number(a.totalmarks), 0)}
                    </td>
                  </tr>

                  <tr className="bg-gray-100 font-bold text-sm">
                    <td className="py-2 px-4 border-t text-right" colSpan={3}>
                      Obtained Absolute:{" "}
                      {(
                        (assignmentmarks
                          .filter((a) => a.assignmentnumber !== null)
                          .reduce(
                            (sum, a) => sum + Number(a.obtainedmarks),
                            0
                          ) /
                          assignmentmarks
                            .filter((a) => a.assignmentnumber !== null)
                            .reduce(
                              (sum, a) => sum + Number(a.totalmarks),
                              0
                            )) *
                        10
                      ).toFixed(2)}{" "}
                      / 10
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              MidTerm Marks
            </h2>
            {midmarks.length === 0 ? (
              <p className="text-gray-500 italic">No marks uploaded yet</p>
            ) : (
              <table className="min-w-full bg-white shadow-md border border-gray-200 rounded-lg">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">#</th>
                    <th className="py-3 px-4 border-b text-left">
                      Obtained Marks
                    </th>
                    <th className="py-3 px-4 border-b text-left">
                      Total Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {midmarks
                    .filter((m) => m.midmarks !== null)
                    .map((m, index) => (
                      <tr key={index} className="text-sm hover:bg-gray-50">
                        <td className="py-2 px-4 border-t">{m.midnumber}</td>
                        <td className="py-2 px-4 border-t">
                          {m.obtainedmarks}
                        </td>
                        <td className="py-2 px-4 border-t">{m.totalmarks}</td>
                      </tr>
                    ))}
                  <tr className="bg-gray-50 font-semibold text-sm">
                    <td className="py-2 px-4 border-t text-right" colSpan={1}>
                      Totals:
                    </td>
                    <td className="py-2 px-4 border-t">
                      {midmarks
                        .filter((m) => m.midnumber !== null)
                        .reduce((sum, m) => sum + Number(m.obtainedmarks), 0)}
                    </td>
                    <td className="py-2 px-4 border-t">
                      {midmarks
                        .filter((m) => m.midnumber !== null)
                        .reduce((sum, a) => sum + Number(a.totalmarks), 0)}
                    </td>
                  </tr>

                  <tr className="bg-gray-100 font-bold text-sm">
                    <td className="py-2 px-4 border-t text-right" colSpan={3}>
                      Obtained Absolute:{" "}
                      {(
                        (midmarks
                          .filter((m) => m.midnumber !== null)
                          .reduce(
                            (sum, m) => sum + Number(m.obtainedmarks),
                            0
                          ) /
                          midmarks
                            .filter((m) => m.midnumber !== null)
                            .reduce(
                              (sum, m) => sum + Number(m.totalmarks),
                              0
                            )) *
                        30
                      ).toFixed(2)}{" "}
                      / 30
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              Final Marks
            </h2>
            {finalmarks.length === 0 ? (
              <p className="text-gray-500 italic">No marks uploaded yet</p>
            ) : (
              <table className="min-w-full bg-white shadow-md border border-gray-200 rounded-lg">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">#</th>
                    <th className="py-3 px-4 border-b text-left">
                      Obtained Marks
                    </th>
                    <th className="py-3 px-4 border-b text-left">
                      Total Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {finalmarks.map((f, index) => (
                    <tr key={index} className="text-sm hover:bg-gray-50">
                      <td className="py-2 px-4 border-t">{index + 1}</td>
                      <td className="py-2 px-4 border-t">{f.obtainedmarks}</td>
                      <td className="py-2 px-4 border-t">{f.totalmarks}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold text-sm">
                    <td className="py-2 px-4 border-t text-right" colSpan={1}>
                      Totals:
                    </td>
                    <td className="py-2 px-4 border-t">
                      {finalmarks.reduce(
                        (sum, f) => sum + Number(f.obtainedmarks),
                        0
                      )}
                    </td>
                    <td className="py-2 px-4 border-t">
                      {finalmarks.reduce(
                        (sum, f) => sum + Number(f.totalmarks),
                        0
                      )}
                    </td>
                  </tr>

                  <tr className="bg-gray-100 font-bold text-sm">
                    <td className="py-2 px-4 border-t text-right" colSpan={3}>
                      Obtained Absolute:{" "}
                      {(
                        (finalmarks.reduce(
                          (sum, f) => sum + Number(f.obtainedmarks),
                          0
                        ) /
                          finalmarks.reduce(
                            (sum, f) => sum + Number(f.totalmarks),
                            0
                          )) *
                        50
                      ).toFixed(2)}{" "}
                      / 50
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              Grand Total
            </h2>
            <table className="min-w-full bg-white shadow-md border border-gray-200 rounded-lg">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="py-3 px-4 border-b text-left">
                    Obtained Absolutes
                  </th>
                  <th className="py-3 px-4 border-b text-left">
                    Total Absolutes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm">
                  <td className="py-3 px-8 border-t font-semibold ">
                    {grandTotalObtainedAbsolute}
                  </td>
                  <td className="py-3 px-8 border-t font-semibold">
                    {grandTotalOutOf}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
