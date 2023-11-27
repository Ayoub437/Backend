const nodeMailer = require("nodemailer");

async function main() {
  try {
    //Created the "createTransport"-message.
    //Defining the transport settings.
    //I save the reference to these settings under.
    const transporter = nodeMailer.createTransport({
      //Information about the Mail-Server that i am going to sending the email from.
      host: "mail.openjavascript.info",
      port: 465, //That is a post that many servers use.
      secure: true,
      //Here i authorize myself with the mail server that i am using.
      auth: {
        user: "test@openjavascript.info",
        pass: "NodeMailer123!",
      },
    });

    //Here I call "sendMail" to the Transporter.
    const info = await transporter.sendMail({});
    //Here I can also include an ID that has been generated or this particular mail.
    console.log("Message sent: " + info.messageId);
  } catch (error) {
    console.log("Error is occured")
  }
}
//I call the function here, to send the email
main();
