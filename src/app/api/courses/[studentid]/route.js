import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';

export async function GET(request, { params }) {
  const studentid = params.studentid;

  try {
    const result = await db.query(
      `
      SELECT c.*, t.firstname, t.lastname 
      FROM courses c 
      JOIN teachers t ON c.teacherid = t.teacherid 
      WHERE c.studentid = $1
      `,
      [studentid]
    );

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    return NextResponse.json(
      {
        message: "Error fetching data",
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
