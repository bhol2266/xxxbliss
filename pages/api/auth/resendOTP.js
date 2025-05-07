// pages/api/register

import nodemailer from 'nodemailer'; // ES module style
import { checkUserExists, getUserByEmail } from './saveProfileFirestore';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body;
            
            const userExist = await checkUserExists(email)
            if (!userExist) {
                return res.status(401).send({ sucess: false, message: 'Email not registered' })
            }
            sendOTPforVerification(res, email)

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        // Method Not Allowed
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}


const sendOTPforVerification = async (res, email) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use true for port 465, false for other ports
        service: 'Gmail',
        auth: {
            user: 'ukdevelopers007@gmail.com',
            pass: 'yeijrvzinvcuzwuf',
        },
    });

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // HTML email content
    const mailOptions = {
        to: email,
        subject: "Chutlunds Account Activation",
        html: `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #007bff;
                        color: #ffffff;
                        padding: 10px 0;
                        border-radius: 8px 8px 0 0;
                    }
                    .content {
                        margin: 20px 0;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: #007bff;
                        margin: 20px 0;
                    }
                    .footer {
                        font-size: 12px;
                        color: #888888;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Chutlunds</h1>
                    </div>
                    <div class="content">
                        <h2>Hello,</h2>
                        <p>Thank you for registering with Chutlunds. To activate your account, please use the following OTP:</p>
                        <div class="otp">${otp}</div>
                        <p>If you did not request this, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Chutlunds. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </html>`,
    };

    // Send email
    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            return res.status(200).send({ success: false, message: error });
        }
        return res.status(200).send({ success: true, data: { email: email, otp: otp }, message: 'OTP Sent Again!' });
    });
};
