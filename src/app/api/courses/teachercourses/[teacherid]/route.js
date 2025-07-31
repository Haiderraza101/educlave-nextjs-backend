import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';

export async function GET(request, { params }) {
  const teacherid = params.teacherid;

  try {
    const result = await db.query(
      `
      SELECT c.*, t.firstname, t.lastname 
      FROM courses c 
      JOIN teachers t ON c.teacherid = t.teacherid 
      WHERE c.teacherid = $1
      `,
      [teacherid]
    );

    return NextResponse.json(result.rows, {
      status: 200
    });
  } catch (err) {
    console.error("Error fetching teacher courses:", err);
    return NextResponse.json({ error: "Server Error" }, {
      status: 500
    });
  }
}
