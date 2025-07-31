import { NextResponse } from 'next/server';
import db from '../../../../../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  try {
    const result = await db.query(`SELECT * FROM users`);
    return NextResponse.json(result.rows);
  } catch (err) {
    return NextResponse.json(
      { message: 'Error fetching user data', error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const result = await db.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Invalid Credentials' }, { status: 401 });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.passwordhash);

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid Credentials' }, { status: 401 });
    }

    let id = null;

    if (user.role === 'Student') {
      const studentResult = await db.query(
        `SELECT studentid FROM students WHERE userid = $1`,
        [user.userid]
      );
      if (studentResult.rows.length > 0) {
        id = studentResult.rows[0].studentid;
      }
    } else if (user.role === 'Teacher') {
      const teacherResult = await db.query(
        `SELECT teacherid FROM teachers WHERE userid = $1`,
        [user.userid]
      );
      if (teacherResult.rows.length > 0) {
        id = teacherResult.rows[0].teacherid;
      }
    }

    const token = jwt.sign(
      {
        id: user.userid,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    const cookieName = user.role === 'Student' ? 'studenttoken' : 'teachertoken';

    const response = NextResponse.json({
      message: 'Login Successful',
      role: user.role,
      userid: user.userid,
      studentid: user.role === 'Student' ? id : null,
      teacherid: user.role === 'Teacher' ? id : null,
    });

    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login Error:', err);
    return NextResponse.json({ message: 'Login Error' }, { status: 500 });
  }
}
