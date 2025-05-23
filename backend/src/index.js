require("dotenv").config({ path: "./src/.env" });
const express = require("express");
const fs = require("fs");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const validateEnvironment = require("../middleware/validateEnvironment");
const verifyRecaptcha = require("../middleware/verifyRecaptcha");

try {
  validateEnvironment();
} catch (error) {
  console.error("Błąd konfiguracji środowiska:", error.message);
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const transporter = require("./mailer");
const validateContactForm = require("../middleware/validateContactForm");

const sendEmail = async (fullName, phoneNumber, email, description) => {
  const subject = `Wiadomość od ${fullName}`;
  const emailBody = `
    Od: ${fullName}
    Telefon: ${phoneNumber || "Brak"}
    Email: ${email}

    Wiadomość:
    ${description}
  `;

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_HOST_USER,
    subject: subject,
    text: emailBody,
  });
};

const sendReplyEmail = async (fullName, email, description) => {
  let footerContent;

  try {
    const footerPath = path.resolve(
      process.cwd(),
      "public",
      "templates",
      "footer.html"
    );
    footerContent = fs.readFileSync(footerPath, "utf-8");
  } catch (err) {
    console.error("Błąd odczytu pliku footer.html:", err);
    footerContent = "<p>Stopka wiadomości nie jest dostępna.</p>";
  }

  const replySubject = "Potwierdzenie otrzymania wiadomości";
  const replyBody = `
    <p>Witaj ${fullName},</p>
    <br/>
    <p>Dziękuję za skontaktowanie się ze mną. Otrzymałam Twoją wiadomość:</p>
    <br/>
    <blockquote>${description}</blockquote>
    <br/>
    <p>Odezwę się na podany numer telefonu lub adres e-mail tak szybko, jak to możliwe.</p>
    <br/><br/>
    ${footerContent}
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_HOST_USER,
    to: email,
    subject: replySubject,
    text: replyBody,
    html: replyBody,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(process.cwd(), "public", "templates", "logo.png"),
        cid: "logo",
      },
    ],
  });
};

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": [
          "'self'",
          "https://www.google.com",
          "https://www.gstatic.com",
        ],
        "frame-src": [
          "'self'",
          "https://www.google.com",
          "https://www.gstatic.com",
        ],
        "connect-src": [
          "'self'",
          "https://www.google.com",
          "https://www.gstatic.com",
        ],
      },
    },
  })
);

app.post("/api/send-email", validateContactForm, async (req, res) => {
  const { full_name, phone_number, email, description, recaptcha } = req.body;

  try {
    const isHuman = await verifyRecaptcha(recaptcha);
    if (!isHuman) {
      return res.status(400).json({
        success: false,
        errors: {
          recaptcha: "Nieudana weryfikacja reCAPTCHA. Spróbuj ponownie.",
        },
      });
    }

    await sendEmail(full_name, phone_number, email, description);
    await sendReplyEmail(full_name, email, description);

    res.status(200).json({
      success: true,
      message:
        "Twoja wiadomość została wysłana pomyślnie. Potwierdzenie zostało wysłane na podany adres e-mail.",
    });
  } catch (err) {
    console.error("Błąd wysyłania wiadomości e-mail:", err);
    res.status(500).json({
      success: false,
      error: err,
      message:
        "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);

module.exports = app;
