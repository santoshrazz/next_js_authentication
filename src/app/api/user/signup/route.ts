import { connectToDB } from "@/app/DbConfig/Connect";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { sendMail } from "@/app/helper/sendMail";
import User from "@/app/models/user.model";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { userName, email, password } = requestBody;

    const isUserExist = await User.findOne({ email });
    console.log(requestBody);
    // Check if user already exists
    if (isUserExist) {
      return NextResponse.json({
        success: false,
        message: "User Already Exists",
      });
    }
    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating user after hasing password
    const newUser = await User.create({
      email,
      userName,
      password: hashedPassword,
    });
    console.log(newUser);
    sendMail({ email, mailType: "VERIFY", userId: newUser._id });
    return NextResponse.json({
      status: true,
      message: "User created",
      newUser,
    });
  } catch (error: any) {
    console.log(`error at creating user`, error);
    return NextResponse.json({
      success: false,
      message: "Error while creating user",
      error,
    });
  }
}
