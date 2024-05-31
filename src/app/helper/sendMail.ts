import nodemailer from "nodemailer";
import { uuid } from "uuidv4";
import User from "../models/user.model";

export const sendMail = async ({
  email,
  mailType,
  userId,
}: {
  email: string;
  mailType: string;
  userId: string;
}) => {
  const generatedVerifyToken = uuid();
  let Link: string = "";
  if (mailType === "VERIFY") {
    Link = `${process.env.DOMAIN}/verifyemail?token=${generatedVerifyToken}`;
  } else if (mailType === "RESET") {
    Link = `${process.env.DOMAIN}/resetPassword?token=${generatedVerifyToken}`;
  }

  if (mailType === "VERIFY") {
    const upDatedUser = await User.findByIdAndUpdate(userId, {
      verifyToken: generatedVerifyToken,
      verifyTokenExpiry: Date.now() + 3600000,
    });
  } else if (mailType === "RESET") {
    const upDatedUser = await User.findByIdAndUpdate(userId, {
      forgetPasswordToken: generatedVerifyToken,
      forgetPasswordExpiry: Date.now() + 3600000,
    });
  }

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4eb4354e899585",
      pass: "e95539e04e34f7",
    },
  });

  const mailOption = {
    from: "santoshrajbgp11@gmail.com", // sender address
    to: email, // list of receivers
    subject: mailType === "VERIFY" ? "Verify Your Email" : "Forgot Password", // Subject line
    html: `<p>
        Click <a href="${Link}">Here</a> to ${
      mailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
    } 
      </p>`, // html body
  };
  const mailResponse = await transport.sendMail(mailOption);
};
