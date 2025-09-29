import { createTransport } from "nodemailer";
const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
    secure:true
  });
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GetO OTP Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f0f4f8;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    table {
      border-spacing: 0;
    }
    td {
      padding: 0;
    }
    .email-wrapper {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .email-content {
      background-color: #ffffff;
      padding: 40px 30px;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
      max-width: 400px;
      width: 90%;
      text-align: center;
    }
    h1 {
      color: #023e8a;
      font-size: 28px;
      margin-bottom: 15px;
    }
    p {
      color: #555;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .otp {
      font-size: 40px;
      color: #0077b6;
      font-weight: bold;
      letter-spacing: 4px;
      margin-bottom: 25px;
    }
    .footer {
      font-size: 14px;
      color: #999;
      margin-top: 10px;
    }
    .promo {
      background-color: #eef2ff;
      border-radius: 8px;
      padding: 15px;
      margin-top: 30px;
      color: #1e3a8a;
      font-weight: 500;
    }
    .promo a {
      color: #2563eb;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <table class="email-wrapper" width="100%" height="100%">
    <tr>
      <td align="center" valign="middle">
        <div class="email-content">
          <h1>GetO OTP Verification</h1>
          <p>Hello ${data.name}, your One-Time Password for verifying your account is:</p>
          <p class="otp">${data.otp}</p>
          <p class="footer">This OTP will expire in 3 minutes. Do not share it with anyone.</p>
          <div class="promo">
            <p>🔥 Check out our latest courses and get 20% off your first subscription! <a href="#">Explore Now</a></p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>

`
  await transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject,
    html,
  });
};

export default sendMail;