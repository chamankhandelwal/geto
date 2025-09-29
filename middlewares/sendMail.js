import nodemailer from "nodemailer";

const sendMail = async (email, subject, data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // use TLS
      auth: {
        user: "9821db001@smtp-brevo.com", // your SMTP login
        pass: "d60pRQJtBj4g3HPM",        // your SMTP key / master password
      },
    });

    const html = `
      <h1>Hello ${data.name}</h1>
      <p>Your OTP is: <strong>${data.otp}</strong></p>
      <p>This OTP will expire in 3 minutes. Do not share it with anyone.</p>
    `;

    await transporter.sendMail({
      from: `GetO <9821db001@smtp-brevo.com>`, // same as SMTP login
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
