export function generateVerificationOtpEmailTemplate(otpCode){
    return `
        <div style="width:100%;max-width:480px;margin:0 auto;background:#ffffff;padding:20px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;border:1px solid #e5e5e5;">
  
  <h2 style="text-align:center;color:#2c6ee8;margin-top:0;">Library Management App</h2>

  <p style="font-size:15px;color:#333;margin-bottom:15px;">
    Your email verification code is:
  </p>

  <div style="text-align:center;margin:20px 0;">
    <span style="display:inline-block;padding:12px 18px;font-size:24px;font-weight:bold;letter-spacing:6px;background:#f1f5ff;border-radius:6px;color:#2c6ee8;">
      ${otpCode}
    </span>
  </div>

  <p style="font-size:14px;color:#666;margin-top:10px;">
    This OTP is valid for <strong>10 minutes</strong>.  
    Please do not share it with anyone.
  </p>

  <p style="font-size:12px;color:#999;margin-top:25px;text-align:center;">
    © ${new Date().getFullYear()} Library Management App
  </p>
</div>

    `
}

export function generateForgotPasswordEmailTemplate(resetPasswordUrl,resetToken){
  return`<div style="width:100%;max-width:480px;margin:0 auto;background:#ffffff;padding:24px;border-radius:10px;font-family:Arial,Helvetica,sans-serif;border:1px solid #e5e5e5;">

  <h2 style="text-align:center;color:#2c6ee8;margin-top:0;margin-bottom:12px;">
    Reset Your Password
  </h2>

  <p style="font-size:15px;color:#333;margin-bottom:18px;">
    We received a request to reset your password. Click the button below to create a new one.
  </p>

  <div style="text-align:center;margin:26px 0;">
    <a href="${resetPasswordUrl}" 
       style="background:#2c6ee8;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-size:16px;display:inline-block;font-weight:bold;">
       Reset Password
    </a>
  </div>

  <p style="font-size:14px;color:#555;margin-top:10px;">
    If you didn’t request this, you can safely ignore this email.  
    This link will expire in <strong>15 minutes.</strong>
  </p>

  <p style="font-size:14px;color:#333;margin-top:20px;">
    Your reset token is:
    <span style="display:inline-block;padding:8px 12px;background:#f1f5ff;border-radius:5px;color:#2c6ee8;font-weight:bold;font-family:monospace;">
      ${resetPasswordUrl}
      ${resetToken}
    </span>
  </p>

  <p style="font-size:12px;color:#999;margin-top:28px;text-align:center;">
    © ${new Date().getFullYear()} Library Management App
  </p>
</div>

`
}