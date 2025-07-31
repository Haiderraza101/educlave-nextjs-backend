import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';


export async function GET(request,{params}){
  const courseid = params.courseid;

  try{
    const [rows]= await db.query(`
   SELECT s.studentid, s.firstname, s.lastname,s.rollnumber,s.currentsemester,YEAR(s.enrollmentdate) AS year
FROM Enrollments e
JOIN Students s ON s.studentid = e.studentid
WHERE e.courseid = ?`,[courseid]
    )
    return NextResponse.json(rows,{
      status:200
    });
  }
  catch(err){
    console.error("Error fetching student for attendence ",err);
    return NextResponse.json({
      error:"Server Error"
    });
  }
}