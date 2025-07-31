import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';

export async function GET(request, { params }) {
  const { courseid } = params;

  if (!courseid || isNaN(courseid)) {
    return NextResponse.json(
      { error: 'Invalid course ID' },
      { status: 400 }
    );
  }

  try {
    const { rows } = await db.query(
      `
      SELECT studentid, obtainedgrandtotal, lettergrade 
      FROM grades 
      WHERE courseid = $1
      `,
      [courseid]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error('Error fetching grades:', err);
    return NextResponse.json(
      { error: 'Server Error' },
      { status: 500 }
    );
  }
}
