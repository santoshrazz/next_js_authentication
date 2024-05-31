import { connectToDB } from "@/app/DbConfig/Connect";
import User from "@/app/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { sendMail } from "@/app/helper/sendMail";

connectToDB();

async function Post(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;
    const isUserExist = await User.findOne({ email });
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
      username,
      password: hashedPassword,
    });
    console.log(newUser);
    sendMail({ email, mailType: "VERIFY", userId: newUser._id });
    NextResponse.json({ status: true, message: "User created", newUser });
  } catch (error: any) {
    console.log(`error at creating user`, error);
    NextResponse.json({ success: false, message: "Error while creating user" });
  }
}
