const { transporter } = require("../MailingService/transporter");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { recievers_mail } = require("../constants");

const sendContactFormEmail = asyncHandler(async (req, res) => {
  const {
    name,
    phoneNumber,
    city,
    state,
    query,
    itemType,
    email,
    category,
    date,
  } = req.body;

  // Validate the required fields
  if (!name || !phoneNumber || !email) {
    console.log("\nRequired fields not received!");
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          {},
          "All required fields (name, phoneNumber, email) must be provided."
        )
      );
  }


  try {
    // Construct the email body
    const mailOptions = {
      from: '"Esson Group" <support@essongroup.com>', // sender address
      to: recievers_mail.join(","), // list of receivers
      subject: "New Contact Form Submission", // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://essongroup.com/assets/esson1-gbSlxAet.png" alt="Esson Group Logo" style="max-width: 150px;"/>
          </div>
          <h2 style="color: #fb903c; text-align: center;">New Contact Us Form Submission</h2>
          <p style="font-size: 16px; color: #333;">Dear Team,</p>
          <p style="font-size: 16px; color: #333;">
            A new query has been submitted through the contact form with the following details:
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 16px; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone Number:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${phoneNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>City:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${
                city || "N/A"
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>State:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${
                state || "N/A"
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Query:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${query}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Item Type:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${
                itemType || "N/A"
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Category:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${
                category || "N/A"
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date Submitted:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${new Date(
                date
              ).toLocaleString()}</td>
            </tr>
          </table>
          <p style="font-size: 16px; color: #333; margin-top: 20px;">Best regards,<br><strong>Esson Group</strong></p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    // Respond with success
    res
      .status(200)
      .json(
        new ApiResponse(201, {}, "Contact form details sent successfully!")
      );
  } catch (error) {
    console.error("Error sending email: ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Error sending contact form details."));
  }
});

module.exports = { sendContactFormEmail };
