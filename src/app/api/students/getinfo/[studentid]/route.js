import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';

export async function GET(request, { params }) {
  try {
    const studentid = params.studentid;

    const [rows] = await db.query(
      `
      SELECT * FROM students WHERE studentid = $1
      `,
      [studentid]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Student not found" }, {
        status: 404
      });
    }

    const student = rows[0];

    return NextResponse.json(student, {
      status: 200
    });
  } catch (err) {
    console.error("Error fetching student info:", err);
    return NextResponse.json({ message: "Internal Server Error" }, {
      status: 500
    });
  }
}
