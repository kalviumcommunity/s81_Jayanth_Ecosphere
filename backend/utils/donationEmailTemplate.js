function donationReceiptEmailHtml({
  donorName,
  itemName,
  amountInr,
  transactionId,
}) {
  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const safeName = escapeHtml(donorName || "Donor");
  const safeItem = escapeHtml(itemName || "Donation");
  const safeAmount = escapeHtml(amountInr ?? "");
  const safeTxn = escapeHtml(transactionId || "(pending)");

  const preheaderText = `Receipt: ₹${safeAmount} for ${safeItem}.`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Donation Receipt</title>
    <style>
      .bg { background:#f6f7fb; }
      .card { background:#ffffff; border-radius:14px; overflow:hidden; }
      .header { background: linear-gradient(90deg, #4f46e5 0%, #2563eb 100%); }
      .brand { color:#ffffff; font-weight:800; font-size:20px; letter-spacing:.2px; }
      .subtitle { color: rgba(255,255,255,.86); font-size:12px; }
      .title { color:#111827; font-size:18px; font-weight:800; }
      .muted { color:#6b7280; }
      .table { border:1px solid #eee; border-radius:12px; overflow:hidden; }
      @media (max-width: 620px) {
        .container { width: 100% !important; }
        .pad { padding: 18px !important; }
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
                <div class="brand" style="font-size:20px;font-weight:800;color:#ffffff;">EcoSphere</div>
                <div class="subtitle" style="color:rgba(255,255,255,.86);font-size:12px;margin-top:4px;">Disaster Response & Relief</div>
              </td>
            </tr>
            <tr>
              <td class="pad" style="padding:24px;">
                <div class="title" style="font-size:18px;font-weight:800;margin-bottom:8px;color:#111827;">Thank you for your donation</div>
                <div style="color:#374151;font-size:14px;line-height:1.7;">
                  Dear ${safeName},<br/>
                  We sincerely appreciate your humanitarian support. Your contribution helps relief teams deliver timely aid to communities affected by disasters.
                </div>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:18px;border:1px solid #eee;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="padding:14px 16px;color:#666;font-size:13px;">Donation Item</td>
                    <td style="padding:14px 16px;color:#111827;font-size:13px;font-weight:700;" align="right">${safeItem}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;color:#666;font-size:13px;border-top:1px solid #eee;">Amount</td>
                    <td style="padding:14px 16px;color:#111827;font-size:13px;font-weight:800;border-top:1px solid #eee;" align="right">₹${safeAmount}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;color:#666;font-size:13px;border-top:1px solid #eee;">Transaction ID</td>
                    <td style="padding:14px 16px;color:#111827;font-size:13px;font-weight:700;border-top:1px solid #eee;" align="right">${safeTxn}</td>
                  </tr>
                </table>

                <div style="margin-top:18px;color:#374151;font-size:14px;line-height:1.7;">
                  With gratitude,<br/>
                  EcoSphere Relief Coordination Team
                </div>

                <div style="margin-top:20px;color:#6b7280;font-size:12px;line-height:1.6;">
                  This is an automated receipt. If you have any questions, please contact the EcoSphere support team.
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

module.exports = { donationReceiptEmailHtml };
