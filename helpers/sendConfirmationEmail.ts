import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (email: string, confirmationCode: string) => {
  try {

    // Crea un objeto de transporte SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
       
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.SMTP_PASSWORD
         },
        // tls: {
        //     ciphers:'SSLv3'
        // }
     
    });
    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

    // Envía el correo electrónico
    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Confirma tu cuenta de usuario',
      text: `Por favor, haz clic en este enlace para confirmar tu cuenta:  ${process.env.BASE_URL}/auth/confirmar-cuenta?token=${confirmationCode}`,
      html:`
      <h2>Por favor, haz clic en este enlace para confirmar tu cuenta</h2>
      <a href=${process.env.BASE_URL}/auth/confirmar-cuenta?token=${confirmationCode}>Confirmar mi cuenta</a>
      `
    });
  } catch (error) {
    console.error(error);
  }
};

export default sendConfirmationEmail;
