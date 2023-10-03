// Importa las dependencias
import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';

// Configura AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2', // Cambia a tu región
});

// Configura el transportador de NodeMailer
const transporter = nodemailer.createTransport({
  SES: new AWS.SES({ apiVersion: '2010-12-01' }),
});

// Función para enviar el correo electrónico
export async function sendError( subject: string) {
  try {
    await transporter.sendMail({
      from: 'Errors Colegio AE  <soporte@colegioae.edu.pe>', // Cambia al remitente deseado
      to:'orellano428@gmail.com',
      subject,
      html: `
      <!DOCTYPE html>
<html>
<head>
  <style>
    /* Estilos generales */
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
    }
    p {
      color: #666666;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #FFC65F;
      color: #2F4858;
      text-decoration: none;
      border-radius: 4px;
    }

    /* Estilos específicos para el contenido */
    .content {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hubo un error</h1>
    <p>Cali</p>
    <p>Hubo un error al subir archivo</p>
    <p class="content">
    <a class="button" href=https://us-west-2.console.aws.amazon.com/ec2-instance-connect/ssh?region=us-west-2&connType=standard&instanceId=i-0d3bdb9ee35488b2e&osUser=ubuntu&sshPort=22#/ >Ver error</a>
    </p>
    
    <p>¡Gracias!</p>
  </div>
</body>
</html>
      `,
    });

    console.log('Correo electrónico enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}
