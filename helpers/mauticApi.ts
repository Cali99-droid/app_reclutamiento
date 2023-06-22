import mauticConfig from '@/mauticConfig';
import axios, { AxiosRequestConfig } from 'axios';

const crearContacto = async (nombre: string, email: string,tokenEmail:string): Promise<void> => {
    try {
      const payload = {
        firstname: nombre,
        email: email,
        token: tokenEmail
      };
  
      await axios.post(`${mauticConfig.apiUrl}/contacts/new`, payload, {
        auth: {
          username: mauticConfig.username,
          password: mauticConfig.password,
        },
      });
  
      console.log('Contacto creado exitosamente');
    } catch (error) {
      console.error('Error al crear el contacto:', error);
      throw error;
    }
  };
  
  export default crearContacto;