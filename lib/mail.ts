import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationMail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your Email",
    html: `<p>Click <a href=${confirmLink}>Here</a> To Confirm Your Email.</p>`,
  });
};

export const sendPasswordResetMail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your Email",
    html: `<p>Click <a href=${resetLink}>Here</a> To Reset Your Password.</p>`,
  });
};
