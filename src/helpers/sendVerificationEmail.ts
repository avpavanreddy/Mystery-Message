const nodemailer = require('nodemailer')
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: false, // use SSL
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"noreply" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Mystery Message Verification Code',
      text: `Hello ${username}, your verification code is ${verifyCode}`,
      html: `<p>Hello ${username},</p><p> Thank you for registering. Please use the following verification
      code to complete your registration.</p><p>Your verification code is <strong>${verifyCode}</strong></p><p>  If you did not request this code, please ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
