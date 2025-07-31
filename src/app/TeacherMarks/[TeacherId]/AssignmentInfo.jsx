export default function AssignmentInfo({
  assesmentType,
  selectedassignmentnumber,
  setselectedassignmentnumber,
  handleProceed,
}) {
  return (
    <div>
      {assesmentType === "assignment" && (
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Enter Assignment Number
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="e.g. 1"
            value={selectedassignmentnumber}
            onChange={(e) => setselectedassignmentnumber(e.target.value)}
          />
        </div>
      )}
      {assesmentType === "assignment" && (
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
