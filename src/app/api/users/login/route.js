import { NextFetchEvent, NextResponse } from 'next/server';
import db from '../../../../../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(){
  try{
    const [rows] = await db.query(
      `
      Select * from users`
    );
    return NextResponse.json(rows);
  }
  catch(err){
    return NextResponse.json({message:"Error fetching user data",error:error.message},
      {
        status:500
      }
    );
    }
  }



export async function POST(request){
  try{
    const {username,password}=await request.json();
    const [rows] = await db.query(
      `
      Select * from users where username = ? `,[username],
    );

    if(!rows.length){
      return NextResponse.json({
        message:"Invalid Credential"
      },{
        status:401
      },)
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password,user.passwordhash);


    if(!isMatch){
      return NextResponse.json({
        message:"Invalid Credentials"
      },{status:401});

    }

    let id = null;

    if (user.role === 'Student'){
      const [studentrows] = await db.query(`
        Select studentid from students where userid = ? `,[user.userid]);

        if (studentrows.length>0){
          id = studentrows[0].studentid;
        }
    }
    else if (user.role==='Teacher'){
      const [teacherrows]=await db.query(
        `
        Select teacherid from teachers where userid = ?  `,[user.userid]
      );
      if(teacherrows.length>0)
      {
        id = teacherrows[0].teacherid;
      }
    }

    const token = jwt.sign(
      {
        id:user.userid,
        username:user.name,
        role:user.role
      },
      JWT_SECRET,{
        expiresIn:"2h"
      }
    );

    
  const cookieName = user.role === 'Student'?'studenttoken':'teachertoken';

  const response = NextResponse.json({
    message:"Login Successfull ",
    role:user.role,
    userid:user.userid,
    studentid : user.role==='Student'? id:null,
    teacherid:user.role==='Teacher'?id:null
  });

  response.cookies.set(cookieName,token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:"lax",
    maxAge:24*60*60*1000,
    path:"/",
  })

  return response;
  }

  catch(err){
    console.error(err);
    return NextResponse.json({message:"Login Error"},{
      status:500
    });

  }


}