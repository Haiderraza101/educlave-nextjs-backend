export default function AssesmentInfo({
  assessmentType,
  selectedQuizNumber,
  setSelectedQuizNumber,
  handleProceed,
}) {
  return (
    <div>
      {assessmentType === "quiz" && (
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Enter Quiz Number
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="e.g. 1"
            value={selectedQuizNumber}
            onChange={(e) => setSelectedQuizNumber(e.target.value)}
          />
        </div>
      )}
      {assessmentType === "quiz" && (
        <div className="mt-6">
          <button
            onClick={handleProceed}
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 "
          >
            Proceed to Upload Marks
          </button>
        </div>
      )}
    </div>
  );
}
