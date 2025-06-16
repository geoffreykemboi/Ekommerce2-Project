import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === "true", // Ensure correct boolean conversion
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`, // Sender address
        to: options.email, // List of receivers
        subject: options.subject, // Subject line
        html: options.message, // Email content in HTML format
    };

    await transporter.sendMail(mailOptions); // Fixed incorrect variable reference (`transport` → `transporter`)
};

export default sendEmail;
