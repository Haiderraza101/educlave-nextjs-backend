import { NextResponse } from 'next/server';
import db from '../../../../../../../lib/db'

export async function GET(request, { params }){
  const { studentid, courseid } = params;

  if (!studentid || !courseid || isNaN(studentid) || isNaN(courseid)) {
    return NextResponse.json(
      { error: "Invalid studentid or courseid" },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      `
      SELECT obtainedmarks, totalmarks
      FROM finals
      WHERE studentid = ? AND courseid = ?
      `,
      [studentid, courseid]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error("Error fetching final marks:", err);
    return NextResponse.json(
      { error: "Server Error in getting Final Marks" },
      { status: 500 }
    );
  }
}
