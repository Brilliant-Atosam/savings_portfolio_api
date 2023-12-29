import { createTransport } from "nodemailer";
const emails = () => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.mail_email,
      pass: process.env.mail_password,
    },
  });
  const resetPassword = (user, reset_link) => {
    const message = `
    <body style="margin: 0; padding: 0; overflow-x: hidden">
  <div
  style="
    background-color: teal;
    color: white;
    width: 100%;
    height: 50px;
    padding: 10px 20px;
    box-sizing: border-box;
    font-weight: 300;
    font-size: 22px;
    font-family: Arial, Helvetica, sans-serif;
  "
  >
  cashLens
  </div>
  <div style="padding: 20px; font-family: sans-serif">

  <h1  style="padding: 0; margin: 0; font-weight: 300">
  Dear ${user.name},
  </h1>

  <p class="para" style="line-height: 30px; font-size: 1rem">
  Someone, hopefully you requested for a password reset. If you did,  <a href='${reset_link}'
  style="
    color: teal;
    cursor: pointer;
  "
>
 reset password now!
</a>  If you did not request for this, you have nothing to worry about. We encourage you to take extra precautions with regards to your account. 
  </p>

  <p class="para" style="line-height: 30px; font-size: 1rem">
    We send our best regards!
  </p>
  <p class="para" style="line-height: 30px; font-size: 1rem">
   Focus, track and thrive!
  </p>
 
  </div>
  </body>`;
    return message;
  };
  const mailOptions = (recipient_email, subject, user, reset_link) => {
    const mailDetails = {
      to: recipient_email,
      from: process.env.mail_email,
      subject,
      html: resetPassword(user, reset_link),
    };
    return mailDetails;
  };
  return { transporter, mailOptions };
};

export default emails;
