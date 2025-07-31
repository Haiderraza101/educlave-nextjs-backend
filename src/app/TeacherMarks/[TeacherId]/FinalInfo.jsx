export default function FinalInfo({ assessmentType, handleProceed }) {
  return (
    <>
      {assessmentType === "final" && (
        <div className="mt-6">
          <button
            onClick={handleProceed}
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
          >
            Proceed to Upload Final Marks
          </button>
        </div>
      )}
    </>
  );
}
