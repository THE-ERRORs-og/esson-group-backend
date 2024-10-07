const { Router } = require("express");
const { testMailingService } = require("../controllers/test_mail");
const { sendContactFormEmail } = require("../controllers/contactus_mail");


const router = Router();

router.route("/testmail").post(testMailingService);
router.route("/send-contact-form").post(sendContactFormEmail);

module.exports = router;