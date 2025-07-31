import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';

export async function PATCH(request, { params }) {
  const body = await request.json();
  const { courseid } = body;

  try {
    const result = await db.query(
      `
      UPDATE courses 
      SET studentid = $1
      WHERE courseid = $2
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
