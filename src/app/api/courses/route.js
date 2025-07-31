import { NextResponse } from "next/server";
import db from '../../../../lib/db';

export async function GET() {
  try {
    const result = await db.query(
      `
      SELECT c.*, t.firstname, t.lastname 
      FROM courses c 
      JOIN teachers t ON c.teacherid = t.teacherid
      `
    );

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Error fetching Courses", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: err.message
      },
      {
        status: 500
      }
    );
  }
}
