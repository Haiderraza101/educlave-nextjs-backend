import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db'

export async function POST(request) {
  try {
    const transcripts = await request.json();

    if (!Array.isArray(transcripts) || transcripts.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty transcript data' },
        { status: 400 }
      );
    }

    for (const t of transcripts) {
      if (
        !t.studentid || !t.courseid || !t.coursecode || !t.coursename ||
        !t.credithours || !t.semester || !t.year || !t.lettergrade
      ) {
        return NextResponse.json(
          { error: 'Missing required fields in transcript entry' },
          { status: 400 }
        );
      }

      await db.query(
        `
        INSERT INTO Transcripts 
        (studentid, courseid, coursecode, coursename, credithours, semester, year, lettergrade)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        lettergrade = VALUES(lettergrade)
        `,
        [
          t.studentid,
          t.courseid,
          t.coursecode,
          t.coursename,
          t.credithours,
          t.semester,
          t.year,
          t.lettergrade,
        ]
      );
    }

    return NextResponse.json(
      { message: 'Transcripts submitted successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error inserting transcripts:', err);
    return NextResponse.json(
      { error: 'Server error while submitting transcripts' },
      { status: 500 }
    );
  }
}
