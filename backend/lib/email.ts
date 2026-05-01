import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendAdmissionConfirmation(to: string, studentName: string, parentName: string) {
  await transporter.sendMail({
    from: `"MNRS Admissions" <${process.env.MAIL_FROM}>`,
    to,
    subject: "Application Received – MNRS Admissions 2027–28",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#fff;">
        <div style="background:linear-gradient(135deg,#1B4332,#2D6A4F);padding:24px;border-radius:12px;text-align:center;margin-bottom:24px;">
          <h1 style="color:#C9A84C;font-size:22px;margin:0;">Maharishi Vidya Mandir</h1>
          <p style="color:#fff;margin:4px 0 0;">National Residential School</p>
        </div>
        <h2 style="color:#1B4332;">Dear ${parentName},</h2>
        <p style="color:#374151;line-height:1.7;">
          Thank you for submitting an admission enquiry for <strong>${studentName}</strong> at MNRS.
          We have received your application and our admissions team will contact you within <strong>24–48 hours</strong>.
        </p>
        <div style="background:#FDF8F0;border-left:4px solid #C9A84C;padding:16px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;color:#374151;font-size:14px;">
            <strong>Next Step:</strong> Our counselor will schedule a student interaction session at your convenience.
          </p>
        </div>
        <p style="color:#374151;">For immediate assistance, call us at <a href="tel:+918939199005" style="color:#2D6A4F;font-weight:600;">+91 89391 99005</a></p>
        <p style="color:#6B7280;font-size:13px;margin-top:32px;border-top:1px solid #E5E7EB;padding-top:16px;">
          AMET Knowledge Park, ECR – Thenpattinam<br>
          <em>"Educating the Mind. Awakening the Potential."</em>
        </p>
      </div>
    `,
  });
}

export async function sendContactAck(to: string, name: string) {
  await transporter.sendMail({
    from: `"MNRS" <${process.env.MAIL_FROM}>`,
    to,
    subject: "We received your enquiry – MNRS",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:32px;">
        <h2 style="color:#1B4332;">Dear ${name},</h2>
        <p style="color:#374151;line-height:1.7;">
          Thank you for reaching out to MNRS. We have received your enquiry and will respond within <strong>24 hours</strong>.
        </p>
        <p style="color:#374151;">Call us directly: <a href="tel:+918939199005" style="color:#2D6A4F;font-weight:600;">+91 89391 99005</a></p>
        <p style="color:#6B7280;font-size:13px;margin-top:24px;"><em>"Educating the Mind. Awakening the Potential."</em></p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(to: string, name: string, resetUrl: string) {
  await transporter.sendMail({
    from: `"MNRS Support" <${process.env.MAIL_FROM}>`,
    to,
    subject: "Reset your MNRS portal password",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#fff;">
        <div style="background:linear-gradient(135deg,#0B3F91,#0F61E5);padding:24px;border-radius:14px;text-align:center;margin-bottom:24px;">
          <h1 style="color:#fff;font-size:24px;margin:0;">MNRS Portal</h1>
          <p style="color:#DCEBFF;margin:8px 0 0;">Secure password assistance</p>
        </div>
        <h2 style="color:#0D1B2A;margin-bottom:12px;">Hello ${name},</h2>
        <p style="color:#475569;line-height:1.7;">
          We received a request to reset your portal password. Use the secure button below to choose a new password.
        </p>
        <p style="margin:28px 0;text-align:center;">
          <a href="${resetUrl}" style="display:inline-block;background:#0F61E5;color:#fff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600;">
            Reset Password
          </a>
        </p>
        <p style="color:#64748B;line-height:1.7;">
          This link expires in 60 minutes. If you did not request a reset, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendNewsletterWelcome(to: string, name?: string) {
  await transporter.sendMail({
    from: `"MNRS Newsletter" <${process.env.MAIL_FROM}>`,
    to,
    subject: "You’re subscribed to the MNRS newsletter",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#fff;">
        <div style="background:linear-gradient(135deg,#0B3F91,#0F61E5);padding:24px;border-radius:14px;text-align:center;margin-bottom:24px;">
          <h1 style="color:#fff;font-size:24px;margin:0;">Welcome to MNRS Updates</h1>
          <p style="color:#DCEBFF;margin:8px 0 0;">News, events, and school highlights</p>
        </div>
        <h2 style="color:#0D1B2A;margin-bottom:12px;">${name ? `Hello ${name},` : "Hello,"}</h2>
        <p style="color:#475569;line-height:1.7;">
          Thanks for subscribing. We’ll share important announcements, upcoming events, and noteworthy updates from the MNRS community.
        </p>
      </div>
    `,
  });
}
