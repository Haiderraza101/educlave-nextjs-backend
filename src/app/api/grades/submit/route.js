import { NextResponse } from 'next/server';
import db from '../../../../../lib/db'

export async function POST(request) {
  try {
    const {
      studentid,
      courseid,
      quiztotal,
      quizobtained,
      assignmenttotal,
      assignmentobtained,
      midtermtotal,
      midtermobtained,
      finaltotal,
      finalobtained,
      totalgrandtotal,
      obtainedgrandtotal,
      lettergrade,
    } = await request.json();

    await db.query(
      `
      INSERT INTO grades (
        studentid,
        courseid,
        quiztotal,
        quizobtained,
        assignmenttotal,
        assignmentobtained,
        midtermtotal,
        midtermobtained,
        finaltotal,
        finalobtained,
        totalgrandtotal,
        obtainedgrandtotal,
        lettergrade
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        studentid,
        courseid,
        quiztotal,
        quizobtained,
        assignmenttotal,
        assignmentobtained,
        midtermtotal,
        midtermobtained,
        finaltotal,
        finalobtained,
        totalgrandtotal,
        obtainedgrandtotal,
        lettergrade,
      ]
    );

    return NextResponse.json({ message: 'Grades submitted successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Error submitting grades:', err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
