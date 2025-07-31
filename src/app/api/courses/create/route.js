import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';

export async function POST(request) {
  const body = await request.json();
  const { coursecode, coursename, description, credithours, teacherid } = body;

  try {
    const result = await db.query(
      `
      INSERT INTO courses (
        coursecode,
        coursename,
        description,
        credithours,
        teacherid
      ) VALUES ($1, $2, $3, $4, $5)
      `,
      [coursecode, coursename, description, credithours, teacherid]
    );

    return NextResponse.json(
      { message: "Course created successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error inserting the course:", err);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
