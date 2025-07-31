import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';

export async function GET(request, { params }) {
  const courseid = params.courseid;

  try {
    const [rows] = await db.query(
      'SELECT * FROM Quizzes WHERE courseid = $1',
      [courseid]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
