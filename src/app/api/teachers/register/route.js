import db from '../../../../../lib/db'
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      username,
      password,
      firstName,
      lastName,
      dob,
      age,
      gender,
      contact,
      email,
      address,
      specialization,
      qualification,
      previousExperience,
      department,
    } = data;
    const [userRows] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (userRows.length > 0) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    const [contactRows] = await db.query(
      "SELECT * FROM teachers WHERE contactnumber = ? OR email = ?",
      [contact, email]
    );
    if (contactRows.length > 0) {
      return NextResponse.json(
        { message: "Contact number or email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [userResult] = await db.query(
      "INSERT INTO users (username, passwordhash, role) VALUES (?, ?, ?)",
      [username, hashedPassword, "Teacher"]
    );

    const userid = userResult.insertId;

 
    await db.query(
      `INSERT INTO teachers (
        userid, firstname, lastname, dateofbirth, age, gender,
        contactnumber, email, address, specialization, qualification,
        previousexperience, department
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userid,
        firstName,
        lastName,
        dob,
        age,
        gender,
        contact,
        email,
        address,
        specialization,
        qualification,
        previousExperience,
        department,
      ]
    );

    return NextResponse.json({ message: "Teacher registered successfully" }, { status: 200 });

  } catch (err) {
    console.error("Registration Error:", err);
    return NextResponse.json({ message: "Internal Server Error", error: err.message }, { status: 500 });
  }
}
