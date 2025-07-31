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

    // Check if username exists
    const userCheck = await db.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    if (userCheck.rows.length > 0) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    // Check if roll number exists
    const rollCheck = await db.query(
      `SELECT * FROM students WHERE rollnumber = $1`,
      [rollNumber]
    );
    if (rollCheck.rows.length > 0) {
      return NextResponse.json({ message: "Roll Number already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const userInsert = await db.query(
      `INSERT INTO users (username, passwordhash, role) VALUES ($1, $2, $3) RETURNING userid`,
      [username, hashedPassword, "Student"]
    );

    const userId = userInsert.rows[0].userid;

    // Insert student details
    await db.query(
      `INSERT INTO students (
        userid, rollnumber, firstname, lastname, dateofbirth, age, gender, 
        contactnumber, email, address, guardianname, guardiancontact, 
        guardianrelation, enrollmentdate, currentsemester, program, department
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, 
        $8, $9, $10, $11, $12, 
        $13, $14, $15, $16, $17
      )`,
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
    return NextResponse.json({ message: "Server Error", error: err.message }, { status: 500 });
  }
}
