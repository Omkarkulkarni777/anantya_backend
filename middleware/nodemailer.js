const nodemailer = require('nodemailer');

const mailSender = async (owner, password, receiver, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: owner,
        pass: password
      }
    });

    const mailOptions = {
      from: owner,
      to: receiver,
      subject: subject,
      text: message
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; 
  }
};

module.exports = mailSender;
