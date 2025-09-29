import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  try {
    console.log("📤 Preparing to send email to:", email);

    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.Gmail,
        pass: process.env.Password,
      },
    });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GetO OTP Verification</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f0f4f8; }
    .email-content { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); text-align: center; }
    .otp { font-size: 40px; color: #0077b6; font-weight: bold; letter-spacing: 4px; }
    .footer { font-size: 14px; color: #999; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="email-content">
    <h1>GetO OTP Verification</h1>
    <p>Hello ${data.name}, your One-Time Password is:</p>
    <p class="otp">${data.otp}</p>
    <p class="footer">This OTP will expire in 3 minutes. Do not share it with anyone.</p>
  </div>
</body>
</html>`;

    await transport.sendMail({
      from: process.env.Gmail,
      to: email,
      subject,
      html,
    });

    console.log("✅ Email sent successfully to:", email);
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
    throw new Error("Email delivery failed");
  }
};

export default sendMail;