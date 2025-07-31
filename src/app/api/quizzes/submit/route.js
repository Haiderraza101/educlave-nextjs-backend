import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';

export async function POST(request) {
  const quizzesRecords = await request.json();

  try {
    for (const record of quizzesRecords) {
      const { studentid, courseid, obtainedmarks, totalmarks, quiznumber } = record;

      await db.query(
        `
        INSERT INTO quizzes (studentid, courseid, quiznumber, obtainedmarks, totalmarks)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          obtainedmarks = VALUES(obtainedmarks),
          totalmarks = VALUES(totalmarks),
          quiznumber = VALUES(quiznumber)
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
