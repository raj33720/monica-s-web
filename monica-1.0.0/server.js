require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serves HTML files

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

app.post("/contact", async(req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: `"Monica Website" <${process.env.SMTP_EMAIL}>`,
            to: process.env.SMTP_EMAIL,
            replyTo: email,
            subject: "New Contact Form Message",
            html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
        });

        res.send("Email sent successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to send email");
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});