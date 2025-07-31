export default function MidInfo({
  assessmentType,
  selectedmidnumber,
  setselectedmidnumber,
  handleProceed,
}) {
  return (
    <div>
      {assessmentType === "mid" && (
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Enter Mid Number
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="e.g. 1"
            value={selectedmidnumber}
            onChange={(e) => setselectedmidnumber(e.target.value)}
          />
        </div>
      )}
      {assessmentType === "mid" && (
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
