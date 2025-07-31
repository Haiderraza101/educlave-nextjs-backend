import { NextResponse } from 'next/server';
import db from '../../../../../../../lib/db';

export async function GET(request,{params}){
  const studentid = params.studentid;
  const courseid = params.courseid;

  try{
    const [rows]= await db.query(`
      Select quiznumber,obtainedmarks,totalmarks from quizzes where studentid = ? and courseid =?`,[studentid,courseid]);
   return NextResponse.json(rows,{
    status:200
   });

  }
  catch(err){
    console.error("Error fetching Quizzes",err);
    return NextResponse.json({error:"Server Error inn getting Quiz Marks"},{
      status:500
    })
  }
}