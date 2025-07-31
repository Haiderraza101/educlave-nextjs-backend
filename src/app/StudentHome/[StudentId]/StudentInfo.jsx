"use client";

import { useEffect, useState } from "react";
import {
  FaUser,
  FaGraduationCap,
  FaPhoneAlt,
  FaUserShield,
} from "react-icons/fa";

export default function StudentInfoWrapper({ StudentId }) {
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    if (!StudentId) return;

    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students/getinfo/${StudentId}`);
        if (res.ok) {
          const data = await res.json();
          setStudentInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch student info:", error);
      }
    };

    fetchStudent();
  }, [StudentId]);

  if (!studentInfo) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading student info...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
      <div className="mb-8 text-center sm:text-left bg-gray-200 p-4 rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          👋 Welcome, {studentInfo.firstname || "Student"}!
        </h1>
        <p className="mt-2 text-gray-600 text-base">
          Your learning journey starts here. Access your courses, track your
          progress, and stay updated with everything you need to succeed. 💡
        </p>
      </div>

      <div className="space-y-10">
        <InfoSection title="Personal Information" icon={<FaUser />}>
          <InfoRow
            label="Name"
            value={`${studentInfo.firstname} ${studentInfo.lastname}`}
          />
          <InfoRow label="Gender" value={studentInfo.gender} />
          <InfoRow
            label="Date of Birth"
            value={
              studentInfo.dateofbirth
                ? new Date(studentInfo.dateofbirth).toISOString().split("T")[0]
                : "N/A"
            }
          />
          <InfoRow label="Age" value={studentInfo.age} />
        </InfoSection>

        <InfoSection title="Academic Information" icon={<FaGraduationCap />}>
          <InfoRow label="Roll Number" value={studentInfo.rollnumber} />
          <InfoRow label="Department" value={studentInfo.department} />
          <InfoRow label="Program" value={studentInfo.program} />
          <InfoRow
            label="Current Semester"
            value={studentInfo.currentsemester}
          />
          <InfoRow
            label="Enrollment Date"
            value={
              studentInfo.enrollmentdate
                ? new Date(studentInfo.enrollmentdate)
                    .toISOString()
                    .split("T")[0]
                : "N/A"
            }
          />
        </InfoSection>

        <InfoSection title="Contact Information" icon={<FaPhoneAlt />}>
          <InfoRow label="Phone" value={studentInfo.contactnumber} />
          <InfoRow label="Email" value={studentInfo.email} />
          <InfoRow label="Address" value={studentInfo.address} />
        </InfoSection>

        <InfoSection title="Guardian Information" icon={<FaUserShield />}>
          <InfoRow
            label="Guardian Name"
            value={studentInfo.guardianname || "N/A"}
          />
          <InfoRow
            label="Contact"
            value={studentInfo.guardiancontact || "N/A"}
          />
          <InfoRow
            label="Relation"
            value={studentInfo.guardianrelation || "N/A"}
          />
        </InfoSection>
      </div>
    </div>
  );
}

function InfoSection({ title, icon, children }) {
  return (
    <section>
      <div className="flex items-center gap-2 text-white bg-gray-700 px-4 py-3 rounded-t-lg">
        <span className="text-lg">{icon}</span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-b-lg grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-800">
        {children}
      </div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <span className="block font-medium text-gray-500">{label}:</span>
      <span className="text-gray-700">{value || "N/A"}</span>
    </div>
  );
}
