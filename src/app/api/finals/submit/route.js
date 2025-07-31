import { NextResponse } from 'next/server';
import db from '../../../../../lib/db'

export async function POST(request) {
  try {
    const finalRecords = await request.json();
    if (!Array.isArray(finalRecords) || finalRecords.length === 0) {
      return NextResponse.json({ error: "Invalid or empty records" }, { status: 400 });
    }

    for (const record of finalRecords) {
      const { studentid, courseid, obtainedmarks, totalmarks } = record;
      if (
        !studentid || !courseid ||
        obtainedmarks == null || totalmarks == null ||
        isNaN(obtainedmarks) || isNaN(totalmarks)
      ) {
        return NextResponse.json({ error: "Invalid record format" }, { status: 400 });
      }

      await db.query(
        `
        INSERT INTO finals (studentid, courseid, obtainedmarks, totalmarks)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          obtainedmarks = VALUES(obtainedmarks),
          totalmarks = VALUES(totalmarks)
        `,
        [studentid, courseid, obtainedmarks, totalmarks]
      );
    }

    return NextResponse.json({ message: "Marks submitted successfully." }, { status: 200 });
  } catch (err) {
    console.error("Error submitting final marks:", err);
    return NextResponse.json(
      { error: "Server error submitting marks." },
      { status: 500 }
    );
  }
}
