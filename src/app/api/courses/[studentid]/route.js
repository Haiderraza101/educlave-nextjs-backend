import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';
import {error} from 'console'

export async function GET(request, { params }) {
   const studentid = params.studentid;
   
   try {
    const [rows] = await db.query(
      `SELECT c.*, t.firstname, t.lastname 
       FROM courses c 
       JOIN teachers t ON c.teacherid = t.teacherid 
       WHERE c.studentid = ?`,
       [studentid]
    );
    
    return NextResponse.json(rows);
   }
   catch (err) {
    console.error("Error fetching data:", err);
    return NextResponse.json({
      message: "Error fetching data",
      error: err.message
    }, {
      status: 500
    });
   }
}