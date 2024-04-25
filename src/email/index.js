const nodemailer = require('nodemailer')


exports.signUpOtp = async ({ mail, name, token, otp }) => {
    const transport = nodemailer.createTransport({
        service: process.env.PLATFORM,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    await transport.sendMail({
        from: process.env.EMAIL,
        to: mail,
        subject: "Verification E-Mail",
        html: ` <div> 
            <p style="color: black; font-family: cursive; font-size:20px; letter-spacing: 1px; text-shadow: 2px 0 3px rgba(0, 0, 0, 0.6);"> welcome  <b style='font-family: monospace;'>${name}</b> Thank you  for choosing our platform </p>
              <div> 
              <p>your OTP NUmber <strong>${otp}</strong></p>
              <button style="padding:10px; outline:none; border:none;   border-radius: 12px;">
              <a style="color: black; font-size:16px;  text-decoration: none;" href="http://localhost:3000/verify?token=${token}&email=${mail}">Verify Email</a> </button>
              <p style="color: black; font-family:cursive; font-size:15px letter-spacing: 1px">Thanks For Regards </p>
              <p style="color: black; font-family: cursive; font-size:15px letter-spacing: 1px">Our Mini Team </p>
              </div>
             </div>`,
    });
}