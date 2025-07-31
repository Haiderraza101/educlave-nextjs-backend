import Sidebar from "./SideBar";
import TeacherInfo from "./TeacherInfo";

export default async function TeacherHomePage({ params }) {
  const { TeacherId } = await params;

  return (
    <div className="min-h-screen flex gap-10 lg:gap-70 bg-gray-100">
      <Sidebar />
      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
        <TeacherInfo TeacherId={TeacherId} />
      </main>
    </div>
  );
}
