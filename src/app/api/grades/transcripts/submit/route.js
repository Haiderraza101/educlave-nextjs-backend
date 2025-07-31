import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';

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
      const {
        studentid,
        courseid,
        coursecode,
        coursename,
        credithours,
        semester,
        year,
        lettergrade
      } = t;

      if (
        !studentid || !courseid || !coursecode || !coursename ||
        !credithours || !semester || !year || !lettergrade
      ) {
        return NextResponse.json(
          { error: 'Missing required fields in transcript entry' },
          { status: 400 }
        );
      }

      await db.query(
        `
        INSERT INTO transcripts (
          studentid, courseid, coursecode, coursename,
          credithours, semester, year, lettergrade
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (studentid, courseid) DO UPDATE SET
          lettergrade = EXCLUDED.lettergrade
        `,
        [
          studentid,
          courseid,
          coursecode,
          coursename,
          credithours,
          semester,
          year,
          lettergrade
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
