"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'claudius@writingedits.com',
        pass: 'ldeurxmhfjsmdfii'
    }
});
async function sendEmail(to, html) {
    let testAccount = await nodemailer_1.default.createTestAccount();
    console.log('testAccount', testAccount);
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: to,
        subject: "Hello ✔",
        html: html,
    });
    console.log("Message sent: %s", info.messageId);
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendMail.js.map