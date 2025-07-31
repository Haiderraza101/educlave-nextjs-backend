import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';

export async function GET(request,{params}){

  const teacherid = params.teacherid;
  try{
    const [rows]= await db.query(
      `
      Select * from teachers where teacherid = ?`,[teacherid]
    );

    if (rows.length===0){
      return NextResponse.json({
        message:"Teacher not found ",status:404
      });
    }
    const teacher = rows[0];

    return NextResponse.json(teacher,{
      teacher:200
    });
  }
  catch(err){
  console.error("Error fetching teacher info ",err);
    return NextResponse.json({message:"Internal Server Error "},{
      status:500
    })
  }
}