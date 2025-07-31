import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';

export async function GET(req, { params }) {
  const { studentid } = params;
  try {
    const [rows] = await db.query(
      `
      SELECT * FROM transcripts WHERE studentid = ?
      `,
      [studentid]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error('Database Error:', err);
    return NextResponse.json(
      { error: 'Server Error' },
      { status: 500 }
    );
  }
}
