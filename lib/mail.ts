import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationMail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your Email",
    html: `<p>Click <a href=${confirmLink}>Here</a> To Confirm Your Email</p>`,
  });
};
