import Sidebar from "./SideBar";
import StudentInfo from "./StudentInfo";

export default async function StudentHomePage({ params }) {
  const { StudentId } = await params;

  return (
    <div className="min-h-screen flex gap-10 lg:gap-70 bg-gray-100">
      <Sidebar />
      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
        <StudentInfo StudentId={StudentId} />
      </main>
    </div>
  );
}
