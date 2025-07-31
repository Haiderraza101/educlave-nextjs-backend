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
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (studentid, courseid, assignmentnumber) DO UPDATE SET
          obtainedmarks = EXCLUDED.obtainedmarks,
          totalmarks = EXCLUDED.totalmarks
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
