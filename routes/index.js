const router = require("express").Router();
const sendMailFromGmail = require("../middlewares/gmail");

router.route("/send").post(sendMailFromGmail);

module.exports = router;