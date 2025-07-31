import db from '../../../../../lib/db';
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

    const userCheck = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userCheck.rows.length > 0) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    const contactCheck = await db.query(
      "SELECT * FROM teachers WHERE contactnumber = $1 OR email = $2",
      [contact, email]
    );
    if (contactCheck.rows.length > 0) {
      return NextResponse.json(
        { message: "Contact number or email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userInsert = await db.query(
      "INSERT INTO users (username, passwordhash, role) VALUES ($1, $2, $3) RETURNING userid",
      [username, hashedPassword, "Teacher"]
    );

    const userId = userInsert.rows[0].userid;

    await db.query(
      `INSERT INTO teachers (
        userid, firstname, lastname, dateofbirth, age, gender,
        contactnumber, email, address, specialization, qualification,
        previousexperience, department
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        userId,
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
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
