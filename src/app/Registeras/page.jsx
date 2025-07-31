import Link from "next/link";
import Image from "next/image";
import students from "../../../public/images/students.jpg";
import teacher from "../../../public/images/teacher.png";

export default function RegisterasPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-8 py-8">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl p-4 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-400 mb-12">
          Register As
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-xs">
            <Image
              src={students}
              alt="Student"
              width={300}
              height={200}
              className="w-full h-56 object-cover"
            />
            <Link
              href="/Studentregistration"
              className="block bg-gray-400 hover:bg-gray-700 text-white text-center font-semibold py-3 transition duration-300"
            >
              Register as Student
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-xs">
            <Image
              src={teacher}
              alt="Teacher"
              width={300}
              height={200}
              className="w-full h-56 object-cover"
            />
            <Link
              href="/TeacherRegistration"
              className="block bg-gray-400 hover:bg-gray-700 text-white text-center font-semibold py-3 transition duration-300"
            >
              Register as Teacher
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
