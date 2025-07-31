import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';

export async function DELETE(request, { params }) {
  const courseid = params.courseid;

  try {
    const result = await db.query(
      `DELETE FROM courses WHERE courseid = $1`,
      [courseid]
    );

    return NextResponse.json(
      { message: "Course deleted successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting course:", err);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
