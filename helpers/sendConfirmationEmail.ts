import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (email: string, confirmationCode: string) => {
  try {
    
    // Crea un objeto de transporte SMTP
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "8f33af5854a61e",
          pass: "c3f5a700a891b2"
        }
     
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
      from: 'micorreo@dominio.com',
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
