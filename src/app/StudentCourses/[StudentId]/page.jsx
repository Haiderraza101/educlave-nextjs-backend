import Sidebar from "@/app/StudentHome/[StudentId]/SideBar";
import CourseCard from "./CourseCard";
import AvailableCourseCard from "./AvailableCourseCard";

export default async function StudentCoursePage({ params }) {
  const { StudentId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${StudentId}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg font-semibold">
          Failed to load enrolled courses.
        </p>
      </div>
    );
  }

  const enrolledCourses = await res.json();

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
    next: { revalidate: 0 },
  });

  if (!res2.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg font-semibold">
          Failed to load available courses.
        </p>
      </div>
    );
  }

  const availableCourses = await res2.json();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-full lg:w-64 border-r border-gray-200 shadow-sm bg-white">
        <Sidebar />
      </div>

      <div className="flex-1 px-6 py-10 space-y-16">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
            Enrolled Courses
          </h1>
          {enrolledCourses.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              You are not enrolled in any courses yet.
            </p>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <CourseCard
                  key={course.courseid}
                  course={course}
                  studentId={StudentId}
                />
              ))}
            </div>
          )}
        </section>

        <section className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
            Available Courses
          </h1>
          {availableCourses.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No courses are available yet.
            </p>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {availableCourses
                .filter(
                  (availableCourse) =>
                    !enrolledCourses.some(
                      (enrolledCourse) =>
                        enrolledCourse.courseid === availableCourse.courseid
                    )
                )
                .map((availableCourse) => (
                  <AvailableCourseCard
                    key={availableCourse.courseid}
                    availablecourse={availableCourse}
                    studentId={StudentId}
                    enrolledCount={enrolledCourses.length}
                  />
                ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
