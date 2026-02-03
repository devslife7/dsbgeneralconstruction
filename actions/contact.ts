"use server"
import { Resend } from "resend"
import { ContactFormSchema, ContactFormTypes } from "@/lib/validators/contact"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(data: unknown) {
  // Validate the data
  const parsedData = ContactFormSchema.safeParse(data)
  if (!parsedData.success) {
    let errorMessage = ""
    parsedData.error.issues.forEach(issue => {
      errorMessage = errorMessage + "\n " + issue.message
    })
    return { status: 400, message: errorMessage, success: false }
  }

  const { name, email, phone, message } = parsedData.data

  // Get recipient email from environment variable (default to a fallback)
  const recipientEmail = process.env.CONTACT_EMAIL || process.env.RESEND_FROM_EMAIL || "your-email@example.com"
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

  try {
    const emailData = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ""}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f0f0f0; color: #666; font-size: 12px;">
            <p>This email was sent from your website contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}

Message:
${message}

---
This email was sent from your website contact form.
Reply directly to this email to respond to ${name}.
      `
    })

    if (emailData.error) {
      console.error("Resend error:", emailData.error)
      return {
        status: 500,
        message: "Failed to send email. Please try again later.",
        success: false
      }
    }

    return {
      status: 200,
      message: "Message sent successfully! We'll get back to you soon.",
      success: true
    }
  } catch (error: any) {
    console.error("Error sending email:", error)
    return {
      status: 500,
      message: "Failed to send message. Please try again or contact us directly.",
      success: false
    }
  }
}
