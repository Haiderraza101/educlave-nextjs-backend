import { NextResponse } from "next/server";
import db from '../../../../../../lib/db'


export async function GET(request,{params}){

  const studentid = params.studentid;

  try{
    const [rows] = await db.query(
      `
      Select * from courses where studentid = ? `
    ,[studentid]);

    return NextResponse.json(rows,{
      status:200
    });
  }
  catch(err){
    console.error(err);
    return NextResponse.json({error:"Server Error"
    },{
      status:500
    });
  }
}