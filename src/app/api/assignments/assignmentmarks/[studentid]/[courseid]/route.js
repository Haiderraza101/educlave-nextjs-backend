import { NextResponse } from 'next/server';
import db from '../../../../../../../lib/db';

export async function GET(request, { params }){
  const { studentid, courseid } = params;

  try {
    const [rows] = await db.query(
      `
      SELECT assignmentnumber, obtainedmarks, totalmarks
      FROM assignments
      WHERE studentid = ? AND courseid = ?
      `,
      [studentid, courseid]
    );

    return NextResponse.json(rows,{
      status:200
    });
  } catch (err) {
    console.error('Error fetching assignment marks:', err);
    return NextResponse.json(
      { error: 'Server Error in getting Assignment Marks' },
      { status: 500 }
    );
  }
}
