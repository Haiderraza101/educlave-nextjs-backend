"use client";

import { useEffect, useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";

export default function TeacherInfoWrapper({ TeacherId }) {
  const [teacherInfo, setTeacherInfo] = useState(null);

  useEffect(() => {
    if (!TeacherId) return;

    const fetchTeacher = async () => {
      try {
        const res = await fetch(`/api/teachers/getinfo/${TeacherId}`);
        if (res.ok) {
          const data = await res.json();
          setTeacherInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch teacher info:", error);
      }
    };

    fetchTeacher();
  }, [TeacherId]);

  if (!teacherInfo) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading teacher info...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
      <header className="bg-gray-200 p-6 rounded-xl mb-10 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          👋 Welcome, {teacherInfo.firstname || "Teacher"}!
        </h1>
        <p className="mt-2 text-gray-600 text-base leading-relaxed">
          Inspire and guide future minds. Manage your courses, view schedules,
          and track your academic contributions. 🎓
        </p>
      </header>

      <div className="space-y-10">
        <InfoSection title="Personal Information" icon={<FaUser />}>
          <InfoRow
            label="Name"
            value={`${teacherInfo.firstname} ${teacherInfo.lastname}`}
          />
          <InfoRow label="Gender" value={teacherInfo.gender} />
          <InfoRow
            label="Date of Birth"
            value={
              teacherInfo.dateofbirth
                ? new Date(teacherInfo.dateofbirth).toISOString().split("T")[0]
                : "N/A"
            }
          />
          <InfoRow label="Age" value={teacherInfo.age} />
        </InfoSection>

        <InfoSection title="Academic Background" icon={<FaGraduationCap />}>
          <InfoRow label="Qualification" value={teacherInfo.qualification} />
          <InfoRow label="Specialization" value={teacherInfo.specialization} />
          <InfoRow label="Department" value={teacherInfo.department} />
        </InfoSection>

        <InfoSection title="Contact Information" icon={<FaPhoneAlt />}>
          <InfoRow label="Phone" value={teacherInfo.contactnumber} />
          <InfoRow label="Email" value={teacherInfo.email} />
          <InfoRow label="Address" value={teacherInfo.address} />
        </InfoSection>

        <InfoSection title="Professional Experience" icon={<FaBriefcase />}>
          <InfoRow
            label="Previous Experience"
            value={teacherInfo.previousexperience || "N/A"}
          />
          <InfoRow
            label="Joined On"
            value={
              teacherInfo.teachercreateddate
                ? new Date(teacherInfo.teachercreateddate)
                    .toISOString()
                    .split("T")[0]
                : "N/A"
            }
          />
          <InfoRow label="Role" value={teacherInfo.role} />
        </InfoSection>
      </div>
    </div>
  );
}

function InfoSection({ title, icon, children }) {
  return (
    <section>
      <div className="flex items-center gap-3 text-white bg-gray-700 px-5 py-3 rounded-t-lg">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
      </div>
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-b-lg grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-800">
        {children}
      </div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <span className="block text-sm text-gray-500 font-medium">{label}:</span>
      <span className="text-base text-gray-700 font-semibold">
        {value || "N/A"}
      </span>
    </div>
  );
}
