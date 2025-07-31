import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';

export async function POST(request) {
  try {
    const midRecords = await request.json();

    if (!Array.isArray(midRecords) || midRecords.length === 0) {
      return NextResponse.json({ error: "Invalid or empty records" }, { status: 400 });
    }

    for (const record of midRecords) {
      const { studentid, courseid, midnumber, obtainedmarks, totalmarks } = record;

      if (!studentid || !courseid || !midnumber || isNaN(obtainedmarks) || isNaN(totalmarks)) {
        return NextResponse.json({ error: "Invalid record format" }, { status: 400 });
      }

      await db.query(
        `
        INSERT INTO midterms (studentid, courseid, midnumber, obtainedmarks, totalmarks)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (studentid, courseid, midnumber) DO UPDATE SET
          obtainedmarks = EXCLUDED.obtainedmarks,
          totalmarks = EXCLUDED.totalmarks
        `,
        [studentid, courseid, midnumber, obtainedmarks, totalmarks]
      );
    }

    return NextResponse.json({ message: "Marks submitted successfully." }, { status: 200 });
  } catch (err) {
    console.error("Error submitting midterm marks:", err);
    return NextResponse.json(
      { error: "Server error submitting marks." },
      { status: 500 }
    );
  }
}
