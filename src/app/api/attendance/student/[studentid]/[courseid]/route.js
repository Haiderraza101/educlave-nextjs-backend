import { NextResponse } from 'next/server';
import db from '../../../../../../../lib/db';

export async function GET(request, { params }) {
  const studentid = params.studentid;
  const courseid = params.courseid;

  try {
    const result = await db.query(
      'SELECT date, status FROM attendance WHERE studentid = $1 AND courseid = $2',
      [studentid, courseid]
    );

    return NextResponse.json(result.rows, {
      status: 200,
    });
  } catch (err) {
    console.error('Error fetching attendance:', err);
    return NextResponse.json(
      { error: 'Server Error' },
      { status: 500 }
    );
  }
}
