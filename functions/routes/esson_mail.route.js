const { Router } = require("express");
const { testMailingService } = require("../controllers/test_mail");
const { sendContactFormEmail } = require("../controllers/contactus_mail");
const { sendQuoteRequestEmail } = require("../controllers/request_quote_mail");


const router = Router();

router.route("/testmail").post(testMailingService);
router.route("/send-contact-form").post(sendContactFormEmail);
router.route("/send-quote-request").post(sendQuoteRequestEmail);

module.exports = router;