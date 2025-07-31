import { NextResponse } from "next/server";
import db from '../../../../../lib/db';
import bcrypt from "bcrypt";


export async function POST(req) {
  try {
    const {
      username,
      password,
      rollNumber,
      firstName,
      lastName,
      dob,
      age,
      gender,
      contact,
      email,
      address,
      guardianName,
      guardianContact,
      guardianRelation,
      enrollmentDate,
      semester,
      program,
      department,
    } = await req.json();

    const [userRows] = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);

    if (userRows.length > 0) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    const [rollRows] = await db.query(`SELECT * FROM students WHERE rollnumber = ?`, [rollNumber]);
    if (rollRows.length > 0) {
      return NextResponse.json({ message: "Roll Number already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const [userResult] = await db.query(
      `INSERT INTO users (username, passwordhash, role) VALUES (?, ?, ?)`,
      [username, hashedPassword, "Student"]
    );

    const userId = userResult.insertId;

   
    await db.query(
      `INSERT INTO students (
        userid, rollnumber, firstname, lastname, dateofbirth, age, gender, 
        contactnumber, email, address, guardianname, guardiancontact, 
        guardianrelation, enrollmentdate, currentsemester, program, department
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        rollNumber,
        firstName,
        lastName,
        dob,
        age,
        gender,
        contact,
        email,
        address,
        guardianName,
        guardianContact,
        guardianRelation,
        enrollmentDate,
        semester,
        program,
        department,
      ]
    );

    return NextResponse.json({ message: "Student Registration Successful" }, { status: 200 });
  } catch (err) {
    console.error("Registration Error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}