const nodemailer = require('nodemailer');

const createTransporter = () => {
    // Development: Use ethereal email for testing
    if (process.env.NODE_ENV === 'development') {
        return nodemailer.createTransporter({
            host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
            port: process.env.EMAIL_PORT || 587,
            auth: {
                user: process.env.EMAIL_USERNAME || '[PLACEHOLDER]',
                pass: process.env.EMAIL_PASSWORD || '[PLACEHOLDER]'
            }
        });
    }

    // Production: Use actual email service
    return nodemailer.createTransporter({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_FROM || '[PLACEHOLDER]', // TODO: Get from client
            pass: process.env.EMAIL_PASSWORD || '[PLACEHOLDER]' // TODO: Get from client
        }
    });
};

const sendEmail = async (options) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `Lotus Kindergarten <${process.env.EMAIL_FROM || 'noreply@lotuskindergarten.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
