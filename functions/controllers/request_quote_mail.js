const { transporter } = require("../MailingService/transporter");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { recievers_mail } = require("../constants");

const sendQuoteRequestEmail = asyncHandler(async (req, res) => {
  const {
    productId,
    product,
    size,
    type,
    print_option,
    quantity,
    unit_price,
    total_price,
    specifications,
    email,
    mobileNumber, // New field for mobile number
  } = req.body;

  // Validate the required fields
  if (
    !product ||
    !size ||
    !type ||
    !print_option ||
    !quantity ||
    !email ||
    !mobileNumber
  ) {
    console.log("\nRequired fields not received!");
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          {},
          "All required fields (product, size, type, print_option, quantity, email, mobileNumber) must be provided."
        )
      );
  }

  try {
    // Construct the email body
    const mailOptions = {
      from: '"Esson Group" <support@essongroup.com>', // sender address
      bcc: recievers_mail.join(","), // list of receivers
      subject: "New Quote Request Submission", // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #fb903c; text-align: center;">New Quote Request Submission</h2>
          <p style="font-size: 16px; color: #333;">Dear Team,</p>
          <p style="font-size: 16px; color: #333;">
            A new quote request has been submitted with the following details:
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 16px; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Product Id :</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${productId}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Product:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${product}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Size:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${size}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Type:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${type}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Print Option:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${print_option}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Quantity:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Unit Price:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${unit_price}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Price:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${total_price}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Specifications:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${
                specifications || "N/A"
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Mobile Number:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${mobileNumber}</td>
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
        new ApiResponse(201, {}, "Quote request details sent successfully!")
      );
  } catch (error) {
    console.error("Error sending email: ", error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Error sending quote request details."));
  }
});

module.exports = { sendQuoteRequestEmail };
