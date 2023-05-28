//express server
const express = require("express");

//Provided method express()
const app = express();
const path = require("path");
//const cors = require("cors");
const nodemailer = require("nodemailer");

// Middleware configuration
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
  .get(getsignUp)
  .post(postsignUp); // to get data from frontend

function getsignUp(req, res) {
  res.sendFile("index.html", { root: __dirname });
}
function postsignUp(req, res) {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mohitsainidna@gmail.com", // generated ethereal user
      pass: "useuenroydavufpu", // generated ethereal password
    },
  });

  const mailOptions = {
    from: "mohitsainidna@gmail.com",
    to: "mohitsainidna@gmail.com",
    subject: "Somebody contacted from Postfolio",
    text: `Name: ${req.body.Username}\nEmail: ${req.body.email}\nSubject: ${req.body.subject}\nMessage: ${req.body.message} `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Error");
    } else {
      console.log("Email sent:" + info.response);
      res.send("Success");
    }
  });
}
