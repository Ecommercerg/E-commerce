var nodemailer = require("nodemailer");

interface sendEmailArgs {
  recipient_email: string;
  reset_token: string;
}

export async function sendEmail({ recipient_email, reset_token }: sendEmailArgs){
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    const mail_configs = {
      from: process.env.NODEMAILER_EMAIL,
      to: recipient_email,
      subject: "KODING 101 PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>CodePen - OTP Email Template</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">TEST</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing TEST. Use the following link to complete your Password Recovery Procedure. Link is valid for 1 hour</p>
      <a href="http://localhost:3000/reset-password/${reset_token}" style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Click here</a>
      <p style="font-size:0.9em;">Regards,<br />Test</p>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`,
    };
    transporter.sendMail(mail_configs, function (error: Error, info: string) {
      if (error) {
        console.log(error);
        throw new Error("Email not sent");
      }
      return { message: "Email sent succesfuly" };
    });
  };
