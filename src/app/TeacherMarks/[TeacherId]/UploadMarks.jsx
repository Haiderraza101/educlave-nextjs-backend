"use client";

import { useEffect, useState } from "react";
import QuizInfo from "./QuizInfo";
import QuizMarks from "./QuizMarks";
import AssesmentInfo from "./AssignmentInfo";
import AssignmentMarks from "./AssignmentMarks";
import MidInfo from "./MidInfo";
import MidMarks from "./MidMarks";
import FinalInfo from "./FinalInfo";
import FinalMarks from "./FinalMarks";

export default function UploadMarks({ mycourses }) {
  const [selectedcourseid, setSelectedCourseid] = useState("");
  const [assessmentType, setAssessmentType] = useState("");
  const [quizmarksform, setquizmarksform] = useState(false);
  const [showquiztable, setshowquiztable] = useState(false);
  const [students, setstudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizNumber, setSelectedQuizNumber] = useState("");
  const [marksdata, setmarksdata] = useState([]);
  const [assignmentmarksform, setassignmentmarksform] = useState(false);
  const [assignments, setassignments] = useState([]);
  const [selectedassignmentnumber, setselectedassignmentnumber] = useState("");
  const [showassignmenttable, setshowassignmenttable] = useState(false);
  const [assignmentmarksdata, setassignmentmarksdata] = useState([]);

  const [selectedmidnumber, setselectedmidnumber] = useState("");
  const [showmidtable, setshowmidtable] = useState(false);
  const [midmarksform, setmidmarksform] = useState(false);
  const [midmarksdata, setmidmarksdata] = useState([]);
  const [mids, setmids] = useState([]);

  const [showfinaltable, setshowfinaltable] = useState(false);
  const [finalmarksform, setfinalmarksform] = useState(false);
  const [finalmarksdata, setfinalmarksdata] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedcourseid) return;
      try {
        const res = await fetch(`/api/students/course/${selectedcourseid}`);
        const data = await res.json();
        setstudents(data);
        setmarksdata(
          data.map((student) => ({
            studentid: student.studentid,
            obtainedmarks: "",
            totalmarks: "",
          }))
        );
        setassignmentmarksdata(
          data.map((student) => ({
            studentid: student.studentid,
            obtainedmarks: "",
            totalmarks: "",
          }))
        );
        setmidmarksdata(
          data.map((student) => ({
            studentid: student.studentid,
            obtainedmarks: "",
            totalmarks: "",
          }))
        );
        setfinalmarksdata(
          data.map((student) => ({
            studentid: student.studentid,
            obtainedmarks: "",
            totalmarks: "",
          }))
        );
      } catch (err) {
        console.error("Failed to fetch students:", err);
        alert("Error loading students.");
      }
    };
    fetchStudents();
  }, [selectedcourseid]);

  const handleProceed = () => {
    if (!selectedcourseid) return alert("Please select a course");
    if (!assessmentType) return alert("Please select assessment type");
    if (assessmentType === "quiz" && !selectedQuizNumber)
      return alert("Please enter quiz number");

    if (assessmentType === "assignment" && !selectedassignmentnumber)
      return alert("Please enter Assignment Number");
    if (assessmentType === "mid" && !selectedmidnumber)
      return alert("Please enter Mid Number");

    if (assessmentType === "quiz") {
      setquizmarksform(true);
    }
    if (assessmentType === "assignment") {
      setassignmentmarksform(true);
    }
    if (assessmentType === "mid") {
      setmidmarksform(true);
    }

    if (assessmentType === "final") {
      setfinalmarksform(true);
    }
  };

  const handleInputChange = (index, field, value) => {
    if (assessmentType === "quiz") {
      const updatedMarks = [...marksdata];
      updatedMarks[index][field] = value;
      setmarksdata(updatedMarks);
    }
    if (assessmentType === "assignment") {
      const updatedassignmentMarks = [...assignmentmarksdata];
      updatedassignmentMarks[index][field] = value;
      setassignmentmarksdata(updatedassignmentMarks);
    }
    if (assessmentType === "mid") {
      const updated = [...midmarksdata];
      updated[index][field] = value;
      setmidmarksdata(updated);
    }
    if (assessmentType === "final") {
      const updated = [...finalmarksdata];
      updated[index][field] = value;
      setfinalmarksdata(updated);
    }
  };

  const handleSubmitMarks = async () => {
    if (assessmentType === "quiz") {
      try {
        const body = marksdata.map((entry) => ({
          courseid: selectedcourseid,
          studentid: entry.studentid,
          obtainedmarks: entry.obtainedmarks,
          totalmarks: entry.totalmarks,
          quiznumber:
            assessmentType === "quiz" ? parseInt(selectedQuizNumber) : null,
        }));

        const res = await fetch(`/api/quizzes/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const result = await res.json();
        if (res.ok) {
          alert("Marks uploaded successfully.");
          setshowquiztable(false);
        } else {
          alert("Failed to upload marks: " + result.error);
        }
      } catch (error) {
        console.error("Error submitting marks:", error);
        alert("An error occurred while submitting marks.");
      }
    }
    if (assessmentType === "assignment") {
      try {
        const body = assignmentmarksdata.map((entry) => ({
          courseid: selectedcourseid,
          studentid: entry.studentid,
          obtainedmarks: entry.obtainedmarks,
          totalmarks: entry.totalmarks,
          assignmentnumber:
            assessmentType === "assignment"
              ? parseInt(selectedassignmentnumber)
              : null,
        }));

        const res = await fetch(`/api/assignments/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const result = await res.json();

        if (res.ok) {
          alert("Marks uploaded successfully.");
          setshowassignmenttable(false);
        } else {
          alert("Failed to upload marks: " + result.error);
        }
      } catch (error) {
        console.error("Error submitting marks:", error);
        alert("An error occurred while submitting marks.");
      }
    }

    if (assessmentType === "mid") {
      try {
        const body = midmarksdata.map((entry) => ({
          courseid: selectedcourseid,
          studentid: entry.studentid,
          obtainedmarks: entry.obtainedmarks,
          totalmarks: entry.totalmarks,
          midnumber: parseInt(selectedmidnumber),
        }));
        const res = await fetch(`/api/mids/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const result = await res.json();
        if (res.ok) {
          alert("Mid marks uploaded successfully.");
          setshowmidtable(false);
        } else {
          alert("Failed to upload mid marks: " + result.error);
        }
      } catch (err) {
        console.error(err);
        alert("Error submitting mid marks.");
      }
    }

    if (assessmentType === "final") {
      try {
        const body = finalmarksdata.map((entry) => ({
          courseid: selectedcourseid,
          studentid: entry.studentid,
          obtainedmarks: entry.obtainedmarks,
          totalmarks: entry.totalmarks,
        }));
        const res = await fetch(`/api/finals/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const result = await res.json();
        if (res.ok) {
          alert("Final marks uploaded successfully.");
          setshowfinaltable(false);
        } else {
          alert("Failed to upload final marks: " + result.error);
        }
      } catch (err) {
        console.error(err);
        alert("Error submitting final marks.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-700">Upload Marks</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Select a course and assessment
        </p>
      </div>

      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 space-y-6">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Course</label>
          <select
            value={selectedcourseid}
            onChange={(e) => {
              setSelectedCourseid(e.target.value);
              setquizmarksform(false);
              setassignmentmarksform(false);
              setAssessmentType("");
              setQuizzes([]);
              setSelectedQuizNumber("");
            }}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select a Course</option>
            {mycourses.map((course) => (
              <option key={course.courseid} value={course.courseid}>
                {course.coursecode} - {course.coursename}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Assessment Type
          </label>
          <select
            value={assessmentType}
            onChange={(e) => setAssessmentType(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Type</option>
            <option value="quiz">Quiz</option>
            <option value="assignment">Assignment</option>
            <option value="mid">Mid</option>
            <option value="final">Final</option>
          </select>
        </div>
        <QuizInfo
          assessmentType={assessmentType}
          selectedQuizNumber={selectedQuizNumber}
          setSelectedQuizNumber={setSelectedQuizNumber}
          handleProceed={handleProceed}
        ></QuizInfo>
        <AssesmentInfo
          assesmentType={assessmentType}
          selectedassignmentnumber={selectedassignmentnumber}
          setselectedassignmentnumber={setselectedassignmentnumber}
          handleProceed={handleProceed}
        ></AssesmentInfo>
        <MidInfo
          assessmentType={assessmentType}
          selectedmidnumber={selectedmidnumber}
          setselectedmidnumber={setselectedmidnumber}
          handleProceed={handleProceed}
        />
        <FinalInfo
          assessmentType={assessmentType}
          handleProceed={handleProceed}
        />
      </div>
      <QuizMarks
        quizmarksform={quizmarksform}
        setshowquiztable={setshowquiztable}
        showquiztable={showquiztable}
        assessmentType={assessmentType}
        students={students}
        marksdata={marksdata}
        handleInputChange={handleInputChange}
        handleSubmitMarks={handleSubmitMarks}
      ></QuizMarks>
      <AssignmentMarks
        assignmentmarksform={assignmentmarksform}
        setshowassignmenttable={setshowassignmenttable}
        showassignmenttable={showassignmenttable}
        assessmentType={assessmentType}
        students={students}
        assignmentmarksdata={assignmentmarksdata}
        handleInputChange={handleInputChange}
        handleSubmitMarks={handleSubmitMarks}
      ></AssignmentMarks>
      <MidMarks
        midmarksform={midmarksform}
        setshowmidtable={setshowmidtable}
        showmidtable={showmidtable}
        students={students}
        midmarksdata={midmarksdata}
        handleInputChange={handleInputChange}
        handleSubmitMarks={handleSubmitMarks}
        assessmentType={assessmentType}
      />

      <FinalMarks
        finalmarksform={finalmarksform}
        setshowfinaltable={setshowfinaltable}
        showfinaltable={showfinaltable}
        students={students}
        finalmarksdata={finalmarksdata}
        handleInputChange={handleInputChange}
        handleSubmitMarks={handleSubmitMarks}
        assessmentType={assessmentType}
      />
    </div>
  );
}
