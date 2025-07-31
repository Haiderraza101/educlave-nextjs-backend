import { NextResponse } from 'next/server';
import db from '../../../../../../lib/db';


export async function DELETE(request,{params}){
 
   const courseid = params.courseid;
  

  try{
    const result =await db.query(
      `
      Delete from Courses where courseid = ? `,
      [courseid]
    );
    return NextResponse.json({message:"Course deleted Successfully ! "},{
      status:200
    });
  }
  catch(err){
    console.error("Error deleting Course ",err);
    return NextResponse.json({error:"Failed to delete course "},{
      status:500
    })
  }
}