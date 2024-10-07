const { recievers_mail } = require("../constants");
const { transporter } = require("../MailingService/transporter");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");


const testMailingService = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Validate that the email field is provided
  if (!email) {
    console.log("\nRequired field (email) not received !!!!");
    throw new ApiError(400, "Email field is required for the test email.");
  }

  try {
    const info = await transporter.sendMail({
      from: '"Esson Group" <pubgplayerjvm@gmail.com>', // Sender address
      to: email, // Send test email to the provided email
      subject: "Test Email from Esson Group", // Test subject line
      text: `Hello, This is a test email sent from Esson Group's mailing service.`, // Plain text body
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #4CAF50; text-align: center;">Test Email</h2>
          <p style="font-size: 16px; color: #333;">
            Hello,
          </p>
          <p style="font-size: 16px; color: #333;">
            This is a test email sent from Esson Group's mailing service. Please confirm if you received this test email.
          </p>
          <p style="font-size: 16px; color: #333; margin-top: 20px;">Best regards,<br><strong>Esson Group</strong></p>
        </div>
      `,
    });

    console.log("Test email sent: %s", info.messageId);
    res
      .status(200)
      .json(new ApiResponse(201, {}, "Test email sent successfully!"))
      .send();
  } catch (error) {
    console.error("Error sending test email: ", error);
    throw new ApiError(400, "Error sending test email");
  }
});



module.exports = {testMailingService};