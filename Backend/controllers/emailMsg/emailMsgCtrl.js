const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const Filter = require("bad-words");
const EmailMsg = require("../../model/EmailMessaging/EmailMessaging");

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  const { to, subject, message } = req.body;

  const emailMessage = subject + " " + message;

  const filter = new Filter();
  const isProfane = filter.isProfane(emailMessage);

  if (isProfane) {
    throw new Error("Email sent failed because it contains profane words");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const msg = {
      from: process.env.EMAIL,
      to,
      subject,
      text: message,
    };

    await transporter.sendMail(msg);

    await EmailMsg.create({
      sentBy: req?.user?._id,
      from: req?.user?.email,
      to,
      message,
      subject,
    });
    res.json("Mail-sent");
  } catch (error) {
    res.json(error);
  }
});

module.exports = { sendEmailMsgCtrl };
