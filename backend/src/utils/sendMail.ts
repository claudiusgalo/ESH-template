"use strict";
import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: 'mypev7tmahiqt5db@ethereal.email',
//     pass: 'ldeurxmhfjsmdfii'
//   }
// });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'claudius@writingedits.com',
    pass: 'ldeurxmhfjsmdfii'
  }
});


// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  let testAccount = await nodemailer.createTestAccount();
  console.log('testAccount', testAccount)

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: "Hello ✔", // Subject line
    // text: html, // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}