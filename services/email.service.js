const nodeMailer = require("nodemailer");
//This function has parameters, because these variables are not fixed, they are changeable.
async function sendEmailToUser(subject, html, to) {
  try {
    //Created the "createTransport"-message.
    //Defining the transport settings.
    //I save the reference to these settings under transport.
    const transporter = nodeMailer.createTransport({
      //Information about the Mail-Server that i am going to sending the email from.
      host: "smtp.gmail.com", //I always use that gmail. It is fixed. "smtp" is for email, it is a protocoll. It is like http.
      port: 465, //That is a port that many servers use. //I use gmail as server.
      secure: true, //That measn https instead of http. I must use it.
      //Here i authorize myself with the mail server that i am using.
      auth: {
        user: "ouatalebayoub@gmail.com",
        pass: proccess.env.NODEMAILER_PASS //That password is just for apps. I can get it in my gmail.
      },
    });

    //Here I call "sendMail" to the Transporter.
    const info = await transporter.sendMail({
      from: '"Prosale" <ouatalebayoub@gmail.com>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: html, // html body
    });
    //Here I can also include an ID that has been generated or this particular mail.
    console.log("Message sent: " + info.messageId);
  } catch (error) {
    console.log("Error is occured")
  }
}


module.exports = {sendEmailToUser}


//Im this file i send an email to the user's email.