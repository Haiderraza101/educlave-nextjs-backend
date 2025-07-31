import Sidebar from "@/app/TeacherHome/[TeacherId]/SideBar";
import UploadMarks from "./UploadMarks";

export default async function TeacherMarksPage({ params }) {
  const { TeacherId } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/teachercourses/${TeacherId}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg font-semibold">
          Failed to load your courses
        </p>
      </div>
    );
  }

  const mycourses = await response.json();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="w-full">
        <Sidebar />
        <UploadMarks mycourses={mycourses}></UploadMarks>
      </div>
    </div>
  );
}
