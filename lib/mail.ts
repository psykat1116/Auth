import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const send2FAEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Confirmation Code",
    html: `<p>Your 2FA Code Is - <b>${token}</b></p>`,
  });
};

export const sendVerificationMail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your Email",
    html: `<p>Click <a href=${confirmLink}>Here</a> To Confirm Your Email.</p>`,
  });
};

export const sendPasswordResetMail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your Email",
    html: `<p>Click <a href=${resetLink}>Here</a> To Reset Your Password.</p>`,
  });
};
