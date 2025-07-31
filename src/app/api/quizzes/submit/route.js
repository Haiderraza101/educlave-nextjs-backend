import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';

export async function POST(request) {
  const quizzesRecords = await request.json();

  try {
    for (const record of quizzesRecords) {
      const { studentid, courseid, quiznumber, obtainedmarks, totalmarks } = record;

      await db.query(
        `
        INSERT INTO quizzes (studentid, courseid, quiznumber, obtainedmarks, totalmarks)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (studentid, courseid, quiznumber) DO UPDATE SET 
          obtainedmarks = EXCLUDED.obtainedmarks,
          totalmarks = EXCLUDED.totalmarks
        `,
        [studentid, courseid, quiznumber, obtainedmarks, totalmarks]
      );
    }

    return NextResponse.json(
      { message: "Marks submitted successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error submitting Quiz Marks:", err);
    return NextResponse.json(
      { error: "Server Error Submitting Quiz Marks" },
      { status: 500 }
    );
  }
}
