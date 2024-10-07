require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { recievers_mail } = require("./constants");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
const port = 3000;

app.use(
  cors({
    origin: process.env.allowed_network,
  })
);

app.get("/", (req, res) => {
    
  res.send("Hello World!");
});

// import routes

const esssonMailRouter = require('./routes/esson_mail.route');

// routes declaration

app.use('/esson_mail' , esssonMailRouter);

// app.listen(port, () => {
//   console.log(`app listening on port ${port}! \nctrl+click to open in browser : http://localhost:${port}`);
// });

const handler = serverless(app);

module.exports.handler = async(event, context) => {
    const result = await handler(event, context);
    return result;
}