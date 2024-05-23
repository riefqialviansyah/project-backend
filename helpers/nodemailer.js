const nodemailer = require("nodemailer");

const sendMail = async (email, name, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.PASSWORD_SENDER,
    },
  });

  const htmlTemplate = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Pembayaran</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f2f2f2;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #fff;
                  border-radius: 10px;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #333;
                  text-align: center;
                }
                p {
                  color: #666;
                  line-height: 1.5;
                }
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: #fff; /* Ubah warna teks menjadi putih */
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 20px;
                  transition: background-color 0.3s ease;
                }
                .button:hover {
                  background-color: #0056b3;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h3>Halo...</h3>
                <h1>${name},</h1>
                <p>Thanks for visited my web page...</p>
                <h3>Your Message: </h3>
                <p>${message}</p>
                <br/>
                <br/>
                <h3>Best regards</h3>
                <br/>
                <p>M. Riefqi Dwi Alviansyah</p>
              </div>
            </body>
            </html>
                
      `;

  await transporter.sendMail({
    from: "riefqi.alviansyah1430@gmail.com",
    to: email,
    subject: "Thank you for message me!",
    html: htmlTemplate,
  });
};

module.exports = sendMail;
