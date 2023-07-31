//express server
const express = require("express");

//Provided method express()
const app = express();
const path = require("path");
//const cors = require("cors");
const nodemailer = require("nodemailer");

// Middleware configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
//app.use(cors());
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const authRouter = express.Router();
app.use("/", authRouter);
authRouter
  .route("") //final route
  .get(homePage)
  .post(contactForm); // to get data from frontend
authRouter.route("/thankyou").get(getThankyouPage);
function getThankyouPage(req, res) {
  res.sendFile("thankyou.html", { root: __dirname });
}
function homePage(req, res) {
  res.sendFile("index.html", { root: __dirname });
}
function contactForm(req, res) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohitsainidna@gmail.com",
      pass: "useuenroydavufpu",
    },
  });

  const mailOptions = {
    from: "mohitsainidna@gmail.com",
    to: "mohitsainidna@gmail.com",
    subject: "Somebody contacted from Postfolio",
    text: `Name: ${req.body.Username}\nEmail: ${req.body.email}\nSubject: ${req.body.subject}\nMessage: ${req.body.message} `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).redirect("/thankyou");
    }
  });
}
