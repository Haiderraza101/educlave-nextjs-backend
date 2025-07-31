import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';

export async function PATCH(request) {
  const body = await request.json(); 
  const { courseid, studentid } = body;

  try {
   
    await db.query(
      `
      UPDATE courses 
      SET studentid = $1 
      WHERE courseid = $2
      `,
      [studentid, courseid]
    );

    await db.query(
      `
      INSERT INTO enrollments (studentid, courseid)
      VALUES ($1, $2)
      ON CONFLICT (studentid, courseid) DO NOTHING
      `,
      [studentid, courseid]
    );

    return NextResponse.json(
      { message: "Student registered successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Registration failed:", err);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
