import { NextResponse } from 'next/server';
import db from '../../../../../../../lib/db';


export async function GET(request,{params}){
    const studentid = params.studentid;
    const courseid = params.courseid;


    try{
        const [rows]=await db.query('Select date,status from attendance where studentid = ? and courseid=?',[studentid,courseid]);

        return NextResponse.json(rows,{
          status:200
        });
    }
    catch(err){

      console.error("Error fetching attendance",err);
      return NextResponse.json({error:"Server Error"},
        {
          status:500
        }
      )
    }
}