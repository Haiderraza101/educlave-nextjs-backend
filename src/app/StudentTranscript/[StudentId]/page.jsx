import Sidebar from "@/app/StudentHome/[StudentId]/SideBar";

function getGradePoint(letterGrade) {
  const map = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.67,
    "B+": 3.33,
    B: 3.0,
    "B-": 2.67,
    "C+": 2.33,
    C: 2.0,
    "C-": 1.67,
    "D+": 1.33,
    D: 1.0,
    F: 0.0,
  };
  return map[letterGrade.toUpperCase()] ?? 0;
}

function calculateSGPA(data) {
  let totalCreditHours = 0;
  let totalGradePoints = 0;

  for (const course of data) {
    const credit = course.credithours;
    const gradePoint = getGradePoint(course.lettergrade);
    totalCreditHours += credit;
    totalGradePoints += credit * gradePoint;
  }

  return totalCreditHours === 0
    ? 0
    : (totalGradePoints / totalCreditHours).toFixed(2);
}

export default async function StudentTranscriptPage({ params }) {
  const { StudentId } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transcript/gettranscript/${StudentId}`,
    { next: { revalidate: 0 } }
  );

  if (!response.ok) {
    console.log("Failed to Load Transcript");
  }

  const transcript = await response.json();
  const sgpa = calculateSGPA(transcript);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 shadow-sm bg-white">
        <Sidebar />
      </div>

      <div className="flex-1 px-4 sm:px-6 py-6 sm:py-10 ">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center items-center text-center gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-600">
                Semester:{" "}
                <span className="text-gray-800">
                  #{transcript[0]?.semester}
                </span>
              </h2>
              <h3 className="text-md sm:text-lg text-gray-500">
                Academic Year:{" "}
                <span className="text-gray-800">{transcript[0]?.year}</span>
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-600">
                SGPA: <span className="text-indigo-600">{sgpa}</span>
              </h2>
            </div>
          </div>

          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-700">
              Transcript
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Academic performance summary
            </p>
          </div>

          <div className="overflow-x-auto shadow rounded-lg bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold">
                    Course Code
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold">
                    Course Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-center font-semibold">
                    Credit Hours
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-center font-semibold">
                    Points
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-center font-semibold">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transcript.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 text-gray-800">
                      {course.coursecode}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-gray-700">
                      {course.coursename}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-center">
                      {course.credithours}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-center">
                      {getGradePoint(course.lettergrade).toFixed(2)}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-center font-semibold text-indigo-600">
                      {course.lettergrade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
