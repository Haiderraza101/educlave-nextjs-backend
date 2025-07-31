import { NextResponse } from "next/server";
import db from '../../../../../../lib/db';

export async function GET(request, { params }) {
  const studentid = params.studentid;

  try {
    const result = await db.query(
      `
      SELECT * FROM courses WHERE studentid = $1
      `,
      [studentid]
    );

    return NextResponse.json(result.rows, {
      status: 200
    });
  } catch (err) {
    console.error("Error fetching student's courses:", err);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
