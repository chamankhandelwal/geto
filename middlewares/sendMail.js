import Resend from "@resendlabs/resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email, subject, data) => {
  try {
    await resend.emails.send({
      from: "GetO <no-reply@geto.com>",
      to: email,
      subject,
      html: `<h1>Hello ${data.name}</h1>
             <p>Your OTP is: <strong>${data.otp}</strong></p>
             <p>This OTP will expire in 3 minutes</p>`
    });
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

export default sendMail;
