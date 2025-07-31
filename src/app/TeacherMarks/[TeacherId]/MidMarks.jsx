export default function MidMarks({
  midmarksform,
  setshowmidtable,
  showmidtable,
  students,
  midmarksdata,
  handleInputChange,
  handleSubmitMarks,
  assessmentType,
}) {
  return (
    <div>
      {midmarksform && (
        <div className="mt-6">
          <div
            onClick={() => setshowmidtable(!showmidtable)}
            className="flex items-center justify-between text-gray-700
             bg-gray-200 px-5 py-3 rounded-t-lg cursor-pointer hover:bg-gray-300 transition"
          >
            <h2 className="text-lg font-semibold">Marks Entry</h2>
            <span className="text-sm">{assessmentType.toUpperCase()}</span>
          </div>
          {showmidtable && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-gray-700 text-sm">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">#</th>
                      <th className="py-3 px-4 border-b text-left">Roll No</th>
                      <th className="py-3 px-4 border-b text-left">Name</th>
                      <th className="py-3 px-4 border-b text-left">Obtained</th>
                      <th className="py-3 px-4 border-b text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index} className="text-sm hover:bg-gray-50">
                        <td className="py-2 px-4 border-t">{index + 1}</td>
                        <td className="py-2 px-4 border-t">
                          {student.rollnumber}
                        </td>
                        <td className="py-2 px-4 border-t">
                          {student.firstname} {student.lastname}
                        </td>
                        <td className="py-2 px-4 border-t">
                          <input
                            type="number"
                            className="w-16 px-2 py-1 border rounded-md text-center"
                            placeholder="8"
                            value={midmarksdata[index]?.obtainedmarks || ""}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "obtainedmarks",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="py-2 px-4 border-t">
                          <input
                            type="number"
                            className="w-16 px-2 py-1 border rounded-md text-center"
                            placeholder="10"
                            value={midmarksdata[index]?.totalmarks || ""}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "totalmarks",
                                e.target.value
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center">
                <button
                  onClick={handleSubmitMarks}
                  className="mt-4 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                  Submit Marks
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
