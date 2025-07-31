import Sidebar from "@/app/StudentHome/[StudentId]/SideBar";
import Attendance from "./Attendance";

export default async function StudentAttendancePage({ params }) {
  const { StudentId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/studentcourses/${StudentId}`,
    { next: { revalidate: 0 } }
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg font-semibold">
          Failed to load your courses.
        </p>
      </div>
    );
  }

  const mycourses = await res.json();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row  bg-gray-50">
      <div className="w-full border-r border-gray-200 shadow-sm bg-white">
        <Sidebar />
        <Attendance mycourses={mycourses} studentId={StudentId}></Attendance>
      </div>
    </div>
  );
}
