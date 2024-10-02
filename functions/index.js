const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
app.use(bodyParser.json());
const port = 3000;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "pubgplayerjvm@gmail.com",
    pass: "zzfpjfucdgrdilqy",
  },
});

app.get("/", (req, res) => {
    
  res.send("Hello World!");
});

app.post("/sendmail", async (req, res) => {
  const { name, email, commodity, quantity, price } = req.body;

  // Check if all fields are provided
  if (!name || !email || !commodity || !quantity || !price) {
    return res
      .status(400)
      .send(
        "All fields (name, email, commodity, quantity, price) are required."
      );
  }

  try {
    const info = await transporter.sendMail({
      from: '"Esson Group" <pubgplayerjvm@gmail.com>', // sender address
      to: "12113078@nitkkr.ac.in,12114021@nitkkr.ac.in", // list of receivers
      subject: "New Registration", // Subject line
      text: `New Registration: Name: ${name}, Email: ${email}, Commodity: ${commodity}, Quantity: ${quantity}, Price: ${price}`, // plain text body
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #4CAF50; text-align: center;">New Registration</h2>
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">
            A new user has registered with the following details:
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 16px; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Commodity:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${commodity}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Quantity:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Price:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${price}</td>
            </tr>
          </table>
          <p style="font-size: 16px; color: #333; margin-top: 20px;">Best regards,<br><strong>Esson Group</strong></p>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    res.send("Mail sent successfully!");
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).send("Error sending email");
  }
});

// app.listen(port, () => {
//   console.log(`app listening on port ${port}! \nctrl+click to open in browser : http://localhost:${port}`);
// });

export const handler = serverless(app);
