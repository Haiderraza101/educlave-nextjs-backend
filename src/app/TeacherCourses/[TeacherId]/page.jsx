import CourseCard from "./CourseCard";
import Sidebar from "@/app/TeacherHome/[TeacherId]/SideBar";
import CreateCourse from "./CreateCourse";

export default async function TeacherCoursePage({ params }) {
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-full lg:w-64 border-r border-gray-200 shadow-sm bg-white">
        <Sidebar />
      </div>

      <div className="flex-1 px-6 py-10 space-y-16">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
            My Courses
          </h1>
          {mycourses.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              You have not created any course yet
            </p>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {mycourses.map((course) => (
                <CourseCard key={course.courseid} course={course} />
              ))}
            </div>
          )}
        </section>

        <CreateCourse teacherId={TeacherId} />
      </div>
    </div>
  );
}
