import axios from 'axios';
import nodemailer from 'nodemailer';

const sendTokenPassword = async (email: string, confirmationCode: string) => {
  const contactData = {
   
    fromEmail: 'bienveindo@colegioae.edu.pe',
    to: email,
    subject: 'recupera tu contraseña',
    fromName: 'Cuentas AE',
    body:`
    <h2>Recupera tu contraseña desde el siguiente enlance</h2>
    <a href=${process.env.BASE_URL}/auth/recuperar-cuenta?token=${confirmationCode}>Recuperar mi password</a>`,
    toList: [
      {
        email: email,
        name: 'Cliente',
      },
    ],
    
  }
    
    // Otros campos según tus necesidades y configuración en Mautic

  try {
    const apiUrl = process.env.MAUTIC_API_URL;
    const mauticUrl = process.env.MAUTIC_URL;
    const publicKey = process.env.MAUTIC_PUBLIC_KEY;
    const secretKey = process.env.MAUTIC_SECRET_KEY;

    // Obtén un token de acceso
    const authResponse = await axios.post(
      `${mauticUrl}/oauth/v2/token`,
      {
        client_id: publicKey,
        client_secret: secretKey,
        grant_type: 'client_credentials',
      }
    );

    const accessToken = authResponse.data.access_token;
console.log(accessToken)
    // Crea el contacto utilizando el token de acceso
    const response = await axios.post(
      `${apiUrl}/emails/send`,
      contactData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('email creado exitosamente:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
 
};

export default sendTokenPassword;
