import nodemailer from "nodemailer";

export const sendMail = async ({
  email,
  mailType,
  userId,
}: {
  email: string;
  mailType: string;
  userId: string;
}) => {
  const mailOption = {
    from: "", // sender address
    to: email, // list of receivers
    subject: mailType === "VERIFY" ? "Verify Your Email" : "Forgot Password", // Subject line
    html: `<p>
        Click <a href="">Here</a> to ${
          mailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
        } 
      </p>`, // html body
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });
  const mailResponse = await transporter.sendMail(mailOption);
};
