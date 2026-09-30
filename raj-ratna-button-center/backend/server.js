const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/user");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
  });

const app = express();

const PORT = 4000;

// ========================================
// Middleware
// ========================================

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ========================================
// Messages JSON File
// ========================================

const messagesFile = path.join(
  __dirname,
  "messages.json"
);

// ========================================
// Gmail Transporter
// ========================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// ========================================
// Check Gmail Configuration
// ========================================

transporter.verify((error, success) => {
  if (error) {
    console.error(
      "❌ Gmail configuration error:"
    );

    console.error(error.message);
  } else {
    console.log(
      "✅ Gmail is ready to send emails"
    );
  }
});

// ========================================
// Save Message Function
// ========================================

const saveMessage = (message) => {
  let messages = [];

  try {
    if (fs.existsSync(messagesFile)) {
      const data = fs.readFileSync(
        messagesFile,
        "utf-8"
      );

      messages = data
        ? JSON.parse(data)
        : [];
    }
  } catch (error) {
    console.error(
      "Error reading messages.json:",
      error.message
    );

    messages = [];
  }

  messages.push(message);

  fs.writeFileSync(
    messagesFile,
    JSON.stringify(messages, null, 2)
  );
};

// ========================================
// Home / Test API
// ========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Raj Ratna Button Center Backend is running",
  });
});

// ===============================
// REGISTER API
// ===============================

app.post("/api/auth/register", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
    } = req.body;

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: hashedPassword,
      role: "user",
    });

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Register Error:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
});


// ===============================
// LOGIN API
// ===============================

app.post("/api/auth/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful!",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});

// ========================================
// GET All Messages
// ========================================

app.get("/api/messages", (req, res) => {
  try {
    const data = fs.readFileSync(
      messagesFile,
      "utf-8"
    );

    const messages = data
      ? JSON.parse(data)
      : [];

    res.json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Unable to read messages",
      error: error.message,
    });
  }
});

// ========================================
// CONTACT / ENQUIRY API
// ========================================

app.post(
  "/api/contact",
  async (req, res) => {
    try {
      const {
        type,
        name,
        email,
        phone,
        subject,
        product,
        quantity,
        message,
      } = req.body;

      // ------------------------------------
      // Validation
      // ------------------------------------

      if (!name || !phone || !message) {
        return res.status(400).json({
          success: false,
          message:
            "Name, phone and message are required.",
        });
      }

      // ------------------------------------
      // Create Message
      // ------------------------------------

      const newMessage = {
        id: Date.now(),

        type: type || "Contact",

        name: name.trim(),

        email: email
          ? email.trim()
          : "",

        phone: phone.trim(),

        subject: subject
          ? subject.trim()
          : "",

        product: product
          ? product.trim()
          : "",

        quantity: quantity
          ? quantity.toString().trim()
          : "",

        message: message.trim(),

        createdAt:
          new Date().toISOString(),
      };

      // ------------------------------------
      // Save Message
      // ------------------------------------

      saveMessage(newMessage);

      // ====================================
      // EMAIL
      // ====================================

      const emailHtml = `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
          "
        >

          <h2
            style="
              color: #dc2626;
              margin-bottom: 20px;
            "
          >
            New ${newMessage.type
        } - Raj Ratna Button Center
          </h2>

          <hr />

          <p>
            <strong>Name:</strong>
            ${newMessage.name}
          </p>

          <p>
            <strong>Email:</strong>
            ${newMessage.email ||
        "Not provided"
        }
          </p>

          <p>
            <strong>Phone:</strong>
            ${newMessage.phone}
          </p>

          ${newMessage.subject
          ? `
                <p>
                  <strong>Subject:</strong>
                  ${newMessage.subject}
                </p>
              `
          : ""
        }

          ${newMessage.product
          ? `
                <p>
                  <strong>Product:</strong>
                  ${newMessage.product}
                </p>
              `
          : ""
        }

          ${newMessage.quantity
          ? `
                <p>
                  <strong>Quantity:</strong>
                  ${newMessage.quantity}
                </p>
              `
          : ""
        }

          <p>
            <strong>Message:</strong>
          </p>

          <div
            style="
              background: #f3f4f6;
              padding: 15px;
              border-radius: 8px;
              line-height: 1.6;
            "
          >
            ${newMessage.message}
          </div>

          <hr />

          <p>
            <strong>Received:</strong>
            ${new Date().toLocaleString(
          "en-IN"
        )}
          </p>

          <p
            style="
              color: #6b7280;
              font-size: 13px;
            "
          >
            This message was received from
            Raj Ratna Button Center website.
          </p>

        </div>
      `;

      // ------------------------------------
      // Send Email
      // ------------------------------------

      let emailSent = false;

      try {
        await transporter.sendMail({
          from: `"Raj Ratna Website" <${process.env.EMAIL_USER}>`,

          to: "yashprajapati07529@gmail.com",

          replyTo:
            newMessage.email ||
            process.env.EMAIL_USER,

          subject:
            `New ${newMessage.type} - ${newMessage.name}`,

          html: emailHtml,
        });

        emailSent = true;

        console.log(
          "✅ Email sent successfully"
        );
      } catch (emailError) {
        console.error(
          "❌ Email sending failed:"
        );

        console.error(
          emailError.message
        );
      }

      // ====================================
      // WHATSAPP MESSAGE
      // ====================================

      const whatsappMessage = `
🔔 New ${newMessage.type}

🏢 Raj Ratna Button Center

👤 Name:
${newMessage.name}

📱 Phone:
${newMessage.phone}

📧 Email:
${newMessage.email || "Not provided"}

${newMessage.product
          ? `🧵 Product:
${newMessage.product}

`
          : ""
        }${newMessage.quantity
          ? `📦 Quantity:
${newMessage.quantity}

`
          : ""
        }${newMessage.subject
          ? `📌 Subject:
${newMessage.subject}

`
          : ""
        }💬 Message:
${newMessage.message}

🕐 Time:
${new Date().toLocaleString(
          "en-IN"
        )}
`;

      const whatsappUrl =
        `https://wa.me/918780005274?text=` +
        encodeURIComponent(
          whatsappMessage
        );

      // ====================================
      // RESPONSE
      // ====================================

      res.status(200).json({
        success: true,

        message:
          "Message received successfully!",

        emailSent,

        whatsappUrl,

        data: newMessage,
      });
    } catch (error) {
      console.error(
        "❌ Contact API Error:"
      );

      console.error(error);

      res.status(500).json({
        success: false,

        message:
          "Something went wrong while processing your message.",

        error: error.message,
      });
    }
  }
);

// ========================================
// DELETE MESSAGE
// ========================================

app.delete(
  "/api/messages/:id",
  (req, res) => {
    try {
      const id = Number(
        req.params.id
      );

      const data =
        fs.readFileSync(
          messagesFile,
          "utf-8"
        );

      let messages = data
        ? JSON.parse(data)
        : [];

      const oldLength =
        messages.length;

      messages =
        messages.filter(
          (item) => item.id !== id
        );

      if (
        messages.length ===
        oldLength
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Message not found",
        });
      }

      fs.writeFileSync(
        messagesFile,
        JSON.stringify(
          messages,
          null,
          2
        )
      );

      res.json({
        success: true,
        message:
          "Message deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Unable to delete message",
        error: error.message,
      });
    }
  }
);

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log("");
  console.log(
    "======================================"
  );
  console.log(
    "🚀 Raj Ratna Backend Started"
  );
  console.log(
    "======================================"
  );
  console.log(
    `🌐 http://localhost:${PORT}`
  );
  console.log(
    `📧 Email: ${process.env.EMAIL_USER ||
    "Not configured"
    }`
  );
  console.log(
    "📱 WhatsApp: +91 87800 05274"
  );
  console.log(
    "======================================"
  );
  console.log("");
});