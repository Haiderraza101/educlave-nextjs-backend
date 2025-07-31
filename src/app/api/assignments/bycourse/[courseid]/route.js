import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';

export async function GET(request, { params }) {
  const courseid = params.courseid;

  try {
    const result = await db.query(
      'SELECT * FROM assignments WHERE courseid = $1',
      [courseid]
    );

    return NextResponse.json(result.rows, {
      status: 200
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
