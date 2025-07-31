import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';

export async function PATCH(request, { params }) {
  const body = await request.json();
  const { courseid } = body;

  try {
    const [rows] = await db.query(
      `
      UPDATE courses 
      SET studentid = ?
      WHERE courseid = ?
      `,
      [null, courseid]
    );

    return NextResponse.json(
      { message: "Course dropped successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Drop Course Failed", err);
    return NextResponse.json(
      { error: "Drop Course Failed" },
      { status: 500 }
    );
  }
}
