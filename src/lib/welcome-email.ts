export const WELCOME_SUBJECT = "you're on the list ♥"

export function buildWelcomeText(unsubscribeUrl: string): string {
  return `Thank you for finding us.

Some things take root slowly.
Yours will be ready in a few weeks — late May.

We'll send word the moment it's open.

— meethril

—
Don't want these? Leave the list: ${unsubscribeUrl}
`
}

export function buildWelcomeHtml(unsubscribeUrl: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>welcome to meethril</title>
  </head>
  <body style="margin:0;padding:0;background:#FFE2BC;font-family:Georgia,'Times New Roman',serif;color:#3A1F26;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FFE2BC;padding:48px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:rgba(255,222,198,0.85);border:1px solid rgba(200,71,45,0.18);border-radius:20px;padding:48px 32px;">
            <tr>
              <td align="center" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;letter-spacing:0.18em;color:#3A1F26;font-weight:500;padding-bottom:36px;">
                MEETHRIL
              </td>
            </tr>
            <tr>
              <td align="center" style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.7;font-style:italic;color:#3A1F26;padding-bottom:18px;">
                Thank you for finding us.
              </td>
            </tr>
            <tr>
              <td align="center" style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.7;font-style:italic;color:#3A1F26;padding-bottom:18px;">
                Some things take root slowly.<br />
                Yours will be ready in a few weeks &mdash; late May.
              </td>
            </tr>
            <tr>
              <td align="center" style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.7;font-style:italic;color:#3A1F26;padding-bottom:36px;">
                We&rsquo;ll send word the moment it&rsquo;s open.
              </td>
            </tr>
            <tr>
              <td align="center" style="font-family:Georgia,'Times New Roman',serif;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;color:#6E4248;">
                &mdash; meethril
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;padding-top:20px;">
            <tr>
              <td align="center" style="font-family:Georgia,'Times New Roman',serif;font-size:11px;color:#9A7078;line-height:1.7;">
                a quieter place to think &middot; meethril.com<br />
                <a href="${unsubscribeUrl}" style="color:#9A7078;text-decoration:underline;">leave the list</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
}
