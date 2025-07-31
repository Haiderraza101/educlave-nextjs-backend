import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';

export async function GET(request, { params }) {
  const courseid = params.courseid;

  try {
    const result = await db.query(
      `
      SELECT 
        s.studentid, 
        s.firstname, 
        s.lastname, 
        s.rollnumber, 
        s.currentsemester,
        EXTRACT(YEAR FROM s.enrollmentdate) AS year
      FROM Enrollments e
      JOIN Students s ON s.studentid = e.studentid
      WHERE e.courseid = $1
      `,
      [courseid]
    );

    const rows = result.rows;

    return NextResponse.json(rows, {
      status: 200,
    });
  } catch (err) {
    console.error("Error fetching students for attendance:", err);
    return NextResponse.json({
      error: "Server Error",
    }, { status: 500 });
  }
}
