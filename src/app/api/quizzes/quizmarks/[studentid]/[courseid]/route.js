import { NextResponse } from 'next/server';
import db from '../../../../../../../lib/db';

export async function GET(request, { params }) {
  const studentid = params.studentid;
  const courseid = params.courseid;

  try {
    const result = await db.query(
      `
      SELECT quiznumber, obtainedmarks, totalmarks 
      FROM quizzes 
      WHERE studentid = $1 AND courseid = $2
      `,
      [studentid, courseid]
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error("Error fetching Quizzes:", err);
    return NextResponse.json(
      { error: "Server Error in getting Quiz Marks" },
      { status: 500 }
    );
  }
}
