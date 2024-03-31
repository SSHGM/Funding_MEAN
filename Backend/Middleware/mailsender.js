const nodeMailer = require("nodemailer");

const mailsend = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "Priyansh",
      pass: "p123",
      clientId:"205705214897-rv1bh1nspq3h69bdrirj8gbelsh08gn4.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "https://oauth2.googleapis.com/token",
    },
  });

  const mailOptions = {
    from: "lepton@kotak",
    to: options.email,
    subject: options.subject,
    // text: options.message,
    html: `<div style="background-color: black;
      color: #fff;
      max-width: 500px;
      padding: 40px 20px;
      border-radius: 10px;">
      <div class="card-body">
          <img src="https://cdn-icons-png.flaticon.com/512/4630/4630926.png" alt="email-image" style="display: block;
          width: 15%;
          height: 15%;
          margin-top: 3%;
          margin-left: auto;
          margin-right: auto;" />
          <h2 style="color: rgb(140, 96, 245); text-align: center;">Verify Yor Email</h2>
          <p style="font-size: 12px; text-align: center;">Almost there! We've send a verification email to ${options.name} <br /> You need to verify your email address to log into CrowdsClub.</p>
          <a href=${options.url} style="cursor: pointer;"><button  style="display: block;
          margin-left: auto;
          margin-right: auto;
          width: 37%;
          background-color: rgb(140, 96, 245);
          border: none;
          padding: 10px 20px;
          border-radius: 10rem;">Verify Email</button></a>
      </div>
          `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = mailsend;
