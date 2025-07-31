import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';


export async function GET(request,{params}){
   
  const teacherid = params.teacherid;

  try{
    const [rows]=await db.query(
      `
        Select c.*, t.firstname,t.lastname from courses c join teachers t on c.teacherid = t.teacherid where c.teacherid=? `,[teacherid]
    );

    return NextResponse.json(rows,{
      status:200
    });
  }
  catch(err){
    console.error("Error fetching teacher courses ",err);
    return NextResponse.json({error:"Server Error"},{
      status:500
    })
  }
}