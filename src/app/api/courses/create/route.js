import { NextResponse } from 'next/server';
import db from '../../../../../lib/db'

export async function POST(request){
   const body = await request.json();
   const {coursecode,coursename,description,credithours,teacherid} = body;

   try{
    const result= await db.query(
     `INSERT INTO Courses (
        coursecode,
        coursename,
        description,
        credithours,
        teacherid
      ) VALUES (?, ?, ?, ?, ?)`,
      [coursecode, coursename, description, credithours,  teacherid]
    );

    return NextResponse.json({message:"Couse Created Successfully ! "},{
      status:200
    });

  }
  catch(err){
    console.error("Error Inserting the Courses ",err);
    return NextResponse.json({
      error:"Failed to Create Course "
    },{
      status:500
    })
  }
}