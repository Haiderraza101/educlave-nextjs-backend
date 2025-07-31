import { NextResponse } from 'next/server';
import db from '../../../../../../../lib/db';

export async function GET(request, { params }) {
  const { studentid, courseid } = params;

  if (!studentid || !courseid || isNaN(studentid) || isNaN(courseid)) {
    return NextResponse.json(
      { error: "Invalid studentid or courseid" },
      { status: 400 }
    );
  }

  try {
    const result = await db.query(
      `
      SELECT midnumber, obtainedmarks, totalmarks
      FROM midterms
      WHERE studentid = $1 AND courseid = $2
      `,
      [studentid, courseid]
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error("Error fetching midterm marks:", err);
    return NextResponse.json(
      { error: "Server Error in getting Mid Marks" },
      { status: 500 }
    );
  }
}
