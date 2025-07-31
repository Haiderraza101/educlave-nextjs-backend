import { NextResponse } from "next/server";
import db from '../../../../lib/db';
export async function GET(){
  try{
    const [rows]=await db.query(
      `
      Select c.*, t.firstname,t.lastname from courses c join teachers t on c.teacherid = t.teacherid `
    );
    return NextResponse.json(rows);
  }
  catch(err){
    console.error("Error fetching Courses ",err);
    return NextResponse.json({error:"Internal Server Error",error:err.message},{
      status:500
    });
  }
}