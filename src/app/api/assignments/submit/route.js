import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';

export async function POST(request) {
  try {
    const assignmentRecords = await request.json();

    for (const record of assignmentRecords) {
      const { studentid, courseid, obtainedmarks, totalmarks, assignmentnumber } = record;

      await db.query(
        `
        INSERT INTO assignments (studentid, courseid, assignmentnumber, obtainedmarks, totalmarks)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          obtainedmarks = VALUES(obtainedmarks),
          totalmarks = VALUES(totalmarks),
          assignmentnumber = VALUES(assignmentnumber)
        `,
        [studentid, courseid, assignmentnumber, obtainedmarks, totalmarks]
      );
    }

    return NextResponse.json({ message: "Marks submitted successfully." }, { status: 200 });
  } catch (err) {
    console.error("Error submitting marks:", err);
    return NextResponse.json(
      { error: "Server error submitting marks." },
      { status: 500 }
    );
  }
}