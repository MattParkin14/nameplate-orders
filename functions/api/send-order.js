export async function onRequestPost(context) {
  try {
    const { to, subject, material, size, color, email, facebookName, name } = await context.request.json();

    const emailContent = `
New Nameplate Order Details:
---------------------------
Name: ${name}
Email: ${email}
Facebook Name: ${facebookName}
Material: ${material}
Size: ${size}
Color: ${color}
`;

    await context.env.SENDGRID.send({
      to: to,
      from: "your-verified-sender@yourdomain.com", // Replace with your verified sender
      subject: subject,
      text: emailContent,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}