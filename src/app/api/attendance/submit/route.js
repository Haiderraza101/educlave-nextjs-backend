import db from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { attendanceRecords } = body;

  try {
    for (const record of attendanceRecords) {
      const { studentid, courseid, date, status } = record;

      const correctedDate = new Date(date);
      correctedDate.setDate(correctedDate.getDate() + 1); // adjust timezone if needed

      await db.query(
        `
        INSERT INTO attendance (studentid, courseid, date, status)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (studentid, courseid, date) DO UPDATE SET
          status = EXCLUDED.status
        `,
        [studentid, courseid, correctedDate, status]
      );
    }

    return NextResponse.json(
      { message: 'Attendance submitted successfully!' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error submitting attendance:', err);
    return NextResponse.json(
      { error: 'Server error submitting attendance' },
      { status: 500 }
    );
  }
}
