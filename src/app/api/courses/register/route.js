import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';
export async function PATCH(request){
  
 const body = await request.json(); 
 const {courseid,studentid} = body;
  try{
    const [rows]= await db.query(`
      Update courses set studentid = ? where courseid = ? `,[studentid,courseid]);

      await db.query(`
        Insert Ignore into enrollments (studentid,courseid) 
        values (?,?)`,
      [studentid,courseid]);

      return NextResponse.json({message:"Student Registered Successfully ! ",},{
        status:200
      });
  }
  catch(err){
    console.error("Registration failed ",err);
    return NextResponse.json({
      error:"Registration failed "
    },{
      status:500
    })
  }
}