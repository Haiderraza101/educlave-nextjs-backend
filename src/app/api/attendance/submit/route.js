
import db from '../../../../../lib/db';
import { NextResponse } from 'next/server';


export async function POST(request){
   const body = await request.json();

   const {attendanceRecords} = body;


   try{
    for (const record of attendanceRecords){
      const {studentid,courseid,date,status}=record;
      const correcteddate = new Date(date);
      correcteddate.setDate(correcteddate.getDate() + 1);
        await db.query(
        `
        INSERT INTO Attendance (studentid, courseid, date, status)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status = VALUES(status)
        `,
        [studentid, courseid, correcteddate, status]
      );
    }

    return NextResponse.json({message:"Attendance submitted successfully ! "},{
      status:200
    });
   }
   catch(err){
    console.error("Error Submitting Attendance ",err);
    return NextResponse.json({error:"Server Error submitting attendance "},{
      status:500
    });
   }
}
