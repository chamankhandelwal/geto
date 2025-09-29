import nodemailer from "nodemailer";

const sendMail = async (email, subject, data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_APP_PASSWORD,
      },
    });

    const html = `
      <h1>Hello ${data.name}</h1>
      <p>Your OTP is: <strong>${data.otp}</strong></p>
      <p>This OTP will expire in 3 minutes</p>
    `;

    await transporter.sendMail({
      from: `GetO <${process.env.OUTLOOK_EMAIL}>`,
      to: email,
      subject,
      html,
    });

    console.log("Email sent successfully to", email);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

export default sendMail;
