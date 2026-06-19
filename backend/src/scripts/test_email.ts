import { emailService } from "../utils/emailService";
import dotenv from "dotenv";
import path from "path";

// Load env from backend/.env
dotenv.config({ path: path.join(__dirname, "../../.env") });

async function testEmail() {
  console.log("Starting email test...");
  console.log("SMTP_USER:", process.env.SMTP_USER || "NOT SET");
  console.log("SMTP_PASS:", process.env.SMTP_PASS ? "********" : "NOT SET");

  try {
    await emailService.sendContactEmail({
      name: "TEST_USER",
      email: "test@example.com",
      message: "This is a test message to verify the email service.",
    });
    console.log("Test email sent successfully (or at least no error)! Check your inbox if credentials were set.");
  } catch (error: any) {
    console.error("Test email failed as expected if no credentials provided:");
    console.error(error.message);
  }
}

testEmail();
