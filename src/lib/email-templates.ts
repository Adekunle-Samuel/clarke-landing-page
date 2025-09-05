export const getWaitlistWelcomeEmail = (name: string, waitlistUrl: string = 'https://useclarke.app') => ({
  subject: 'Finally, shopping that feels personal 🙌',
  html: `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Welcome to Clarke - shopping that puts you first</title>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .px-24 { padding-left: 16px !important; padding-right: 16px !important; }
        .py-24 { padding-top: 16px !important; padding-bottom: 16px !important; }
        .btn { width: 100% !important; }
      }
      /* Dark mode tweaks (supported clients) */
      @media (prefers-color-scheme: dark) {
        body, .wrapper { background-color: #0b0b0c !important; color: #f6f6f6 !important; }
        .card { background-color: #141416 !important; }
        .muted { color: #c9c9c9 !important; }
        .btn a { color: #0b0b0c !important; }
      }
    </style>
    <!--<![endif]-->
  </head>
  <body style="margin:0;padding:0;background-color:#f6f7f9;">
    <!-- Preheader (hidden in most clients) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      You're not guess-shopping anymore. Clarke curates pieces that fit your size, body and vibe.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="wrapper" style="background:#f6f7f9;">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="container" style="width:600px;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td align="left" class="px-24 py-24" style="padding:24px;">
                <!-- Logo/Brand -->
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; letter-spacing:2px; font-weight:700; text-transform:uppercase; color:#111;">
                  CLARKE
                </div>
              </td>
            </tr>

            <!-- Hero / Title -->
            <tr>
              <td class="px-24" style="padding:0 24px;">
                <h1 style="margin:0 0 8px 0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:24px; line-height:130%; color:#111;">
                  Finally, shopping that feels personal 🙌
                </h1>
                <p class="muted" style="margin:0 0 16px 0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:150%; color:#555;">
                  Hi ${name},
                </p>
              </td>
            </tr>

            <!-- Body copy -->
            <tr>
              <td class="px-24" style="padding:0 24px;">
                <p style="margin:0 0 12px 0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; line-height:150%; color:#222;">
                  When we set out to build Clarke, it was simple: fashion should work for <em>real people</em>, not just standard sizes.
                </p>
                <p style="margin:0 0 16px 0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; line-height:150%; color:#222;">
                  That's why Clarke is designed to be your personal shopper—curating pieces that actually fit your body, reflect your style, and match your mood.
                </p>
              </td>
            </tr>

            <!-- List -->
            <tr>
              <td class="px-24" style="padding:0 24px;">
                <p style="margin:0 8px 8px 0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:150%; color:#111; font-weight:700;">
                  We're building for you if…
                </p>
                <ul style="margin:0 0 16px 20px;padding:0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#222;">
                  <li style="margin-bottom:8px;font-size:15px;line-height:150%;">You hesitate to shop online because sizes are all over the place.</li>
                  <li style="margin-bottom:8px;font-size:15px;line-height:150%;">You're searching for unique, stylish, and quality pieces but don't know where to start.</li>
                  <li style="margin-bottom:8px;font-size:15px;line-height:150%;">You don't see your body represented when you shop and want a personal experience.</li>
                </ul>
                <p style="margin:0 0 20px 0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; line-height:150%; color:#222;">
                  With Clarke, we're prioritizing what matters most when you find an item—fit, style, and how it makes you feel.
                </p>
              </td>
            </tr>

            <!-- CTA button -->
            <tr>
              <td align="center" class="px-24" style="padding:0 24px 24px 24px;">
                <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${waitlistUrl}" style="height:48px;v-text-anchor:middle;width:300px;" arcsize="12%" stroke="f" fillcolor="#111111">
                  <w:anchorlock/>
                  <center style="color:#ffffff;font-family:Segoe UI, Arial, sans-serif;font-size:16px;font-weight:700;">
                    Share the waitlist
                  </center>
                </v:roundrect>
                <![endif]-->
                <!--[if !mso]><!-- -->
                <a href="${waitlistUrl}"
                   class="btn"
                   style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;border-radius:8px;padding:14px 22px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:16px;font-weight:700;">
                  Share the waitlist
                </a>
                <!--<![endif]-->
                <div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:12px;color:#666;line-height:150%;margin-top:10px;">
                  Or forward this email to a friend who needs this.
                </div>
              </td>
            </tr>

            <!-- Signature -->
            <tr>
              <td class="px-24" style="padding:0 24px 24px;">
                <p style="margin:0 0 4px 0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:150%; color:#222;">
                  With love,
                </p>
                <p style="margin:0 0 12px 0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:150%; color:#222;">
                  Sam &amp; Dishika<br/>
                  Clarke
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:16px 24px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="card" style="background:#f1f2f4;border-radius:10px;">
                  <tr>
                    <td class="py-24 px-24" style="padding:16px 20px;">
                      <p class="muted" style="margin:0;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:12px;line-height:150%;color:#777;">
                        You're receiving this because you joined the Clarke waitlist.
                        If this wasn't you, you can safely ignore this email.
                      </p>
                      <p class="muted" style="margin:8px 0 0;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:12px;line-height:150%;color:#777;">
                        © Clarke — All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
})

export const getPartnerNotificationEmail = (brandName: string, email: string) => ({
  subject: 'New Partnership Request! 🤝',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #6e4d2e;">New Partnership Request</h2>
      <p><strong>Brand Name:</strong> ${brandName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
  `,
})
