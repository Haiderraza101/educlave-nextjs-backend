import Sidebar from "@/app/TeacherHome/[TeacherId]/SideBar";
import UploadGrades from "./UploadGrades";

export default async function UploadGradesPage({ params }) {
  const { TeacherId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/teachercourses/${TeacherId}`,
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
    <div>
      <div className="min-h-screen flex flex-col lg:flex-row  bg-gray-50">
        <div className="w-full ">
          <Sidebar />
          <UploadGrades mycourses={mycourses}></UploadGrades>
        </div>
      </div>
    </div>
  );
}
