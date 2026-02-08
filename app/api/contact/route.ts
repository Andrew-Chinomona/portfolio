import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, projectType, budget, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Use onboarding@resend.dev for testing, or your verified domain
      to: [process.env.CONTACT_EMAIL || "andrewtchinomona@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
        <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">This email was sent from your website contact form.</p>
      `,
      // Optional: Also send a plain text version
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Project Type: ${projectType || "Not specified"}
Budget: ${budget || "Not specified"}

Message:
${message}

---
This email was sent from your website contact form.
      `,
    })

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    )
  }
}

