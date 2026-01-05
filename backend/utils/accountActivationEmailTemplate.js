function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatSupportLine({ supportEmail, appName }) {
  if (!supportEmail) return `This is an automated message from ${appName}.`;
  return `Need help? Contact ${supportEmail}.`;
}

function activationEmailHtml({
  appName = "EcoSphere",
  recipientName,
  activationLink,
  otp,
  expiresInMinutes,
  supportEmail,
  requestLocation,
  requestIp,
}) {
  const safeName = escapeHtml(recipientName || "there");
  const safeApp = escapeHtml(appName);
  const safeSupport = escapeHtml(supportEmail || "");
  const safeLink = escapeHtml(activationLink || "");
  const safeOtp = escapeHtml(otp || "");

  const expiryLine =
    typeof expiresInMinutes === "number" && expiresInMinutes > 0
      ? `This code/link expires in <strong>${expiresInMinutes} minutes</strong>.`
      : "";

  const securityMeta = [
    requestLocation ? `Location: ${escapeHtml(requestLocation)}` : null,
    requestIp ? `IP: ${escapeHtml(requestIp)}` : null,
  ].filter(Boolean);

  const actionBlock = otp
    ? `
      <div style="margin-top:18px;">
        <div style="color:#374151;font-size:14px;line-height:1.7;">
          Use the following one-time code to activate your account:
        </div>
        <div class="panel" style="margin-top:12px; padding:14px 16px; border:1px solid #e9e9ef; border-radius:12px; background:#f6f7fb; text-align:center;">
          <div style="font-size:26px; letter-spacing:6px; font-weight:800; color:#111827;">${safeOtp}</div>
          <div style="margin-top:8px; color:#6b7280; font-size:12px; line-height:1.5;">Do not share this code with anyone.</div>
        </div>
      </div>
    `
    : `
      <div style="margin-top:18px;">
        <div style="color:#374151;font-size:14px;line-height:1.7;">
          Click the button below to activate your account.
        </div>
        <div style="margin-top:14px;">
          <a href="${safeLink}" class="btn" style="display:inline-block; background:#4f46e5; color:#ffffff; text-decoration:none; font-weight:700; font-size:14px; padding:12px 16px; border-radius:10px;">Activate account</a>
        </div>
        <div style="margin-top:12px; color:#666; font-size:12px; line-height:1.6;">
          If the button doesn’t work, copy and paste this link into your browser:<br/>
          <span style="word-break:break-all; color:#111827;">${safeLink}</span>
        </div>
      </div>
    `;

  const ignoreLine =
    "If you did not create this account, you can safely ignore this email.";

  const preheaderText = otp
    ? `Your ${safeApp} activation code is ${safeOtp}.`
    : `Activate your ${safeApp} account.`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Activate your account</title>
    <style>
      /* Email-safe CSS: keep critical styles inline too */
      .bg { background:#f6f7fb; }
      .card { background:#ffffff; border-radius:14px; overflow:hidden; }
      .header { background: linear-gradient(90deg, #4f46e5 0%, #2563eb 100%); }
      .brand { color:#ffffff; font-weight:800; font-size:20px; letter-spacing:.2px; }
      .subtitle { color: rgba(255,255,255,.86); font-size:12px; }
      .title { color:#111827; font-size:18px; font-weight:800; }
      .muted { color:#6b7280; }
      .btn { background:#4f46e5; color:#ffffff !important; }
      .panel { background:#f6f7fb; border:1px solid #e9e9ef; border-radius:12px; }
      @media (max-width: 620px) {
        .container { width: 100% !important; }
        .pad { padding: 18px !important; }
        .title { font-size: 17px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${preheaderText}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7fb;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" class="container" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:14px;overflow:hidden;">
            <tr>
              <td class="header" style="padding:18px 24px;background:#4f46e5;">
                <div class="brand" style="font-size:20px;font-weight:800;color:#ffffff;">${safeApp}</div>
                <div class="subtitle" style="color:rgba(255,255,255,.86);font-size:12px;margin-top:4px;">Account verification</div>
              </td>
            </tr>
            <tr>
              <td class="pad" style="padding:24px;">
                <div class="title" style="font-size:18px;font-weight:800;margin-bottom:8px;color:#111827;">Activate your account</div>
                <div style="color:#374151;font-size:14px;line-height:1.7;">
                  Hello ${safeName},<br/>
                  Thanks for signing up. Please confirm your email address to activate your ${safeApp} account.
                  ${
                    expiryLine
                      ? `<div style="margin-top:10px;">${expiryLine}</div>`
                      : ""
                  }
                </div>

                ${actionBlock}

                <div style="margin-top:18px;color:#374151;font-size:14px;line-height:1.7;">
                  ${ignoreLine}
                </div>

                ${
                  securityMeta.length
                    ? `
                  <div style="margin-top:18px; border:1px solid #eee; border-radius:10px; padding:14px 16px; background:#ffffff;">
                    <div style="font-size:13px; font-weight:700; color:#111; margin-bottom:6px;">Request details</div>
                    <div style="font-size:12px; color:#666; line-height:1.6;">${securityMeta.join(
                      "<br/>"
                    )}</div>
                  </div>
                `
                    : ""
                }

                <div style="margin-top:20px;color:#6b7280;font-size:12px;line-height:1.6;">
                  ${formatSupportLine({
                    supportEmail: safeSupport,
                    appName: safeApp,
                  })}<br/>
                  This is an automated email — please do not reply.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function activationEmailText({
  appName = "EcoSphere",
  recipientName,
  activationLink,
  otp,
  expiresInMinutes,
  supportEmail,
}) {
  const name = recipientName || "there";
  const expiryLine =
    typeof expiresInMinutes === "number" && expiresInMinutes > 0
      ? `This code/link expires in ${expiresInMinutes} minutes.`
      : "";

  const lines = [
    `Hello ${name},`,
    "",
    `Thanks for signing up. Please confirm your email address to activate your ${appName} account.`,
    expiryLine,
    "",
  ].filter(Boolean);

  if (otp) {
    lines.push(`Your activation code: ${otp}`);
  } else if (activationLink) {
    lines.push(`Activate your account: ${activationLink}`);
  }

  lines.push(
    "",
    "If you did not create this account, you can safely ignore this email.",
    "",
    supportEmail
      ? `Need help? Contact ${supportEmail}.`
      : `This is an automated message from ${appName}.`
  );

  return lines.join("\n");
}

module.exports = { activationEmailHtml, activationEmailText };
