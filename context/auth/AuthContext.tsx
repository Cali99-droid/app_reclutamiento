import { IUser } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
      isLoggedIn: boolean;
      user?: IUser

      noConfirm: boolean
      registerUser: (nombre: string, apellidoPat: string, apellidoMat: string, email: string, password: string, fechaNac: Date, tipoId: number, numeroDocumento: string) => Promise<{
            hasError: boolean;
            message?: string;
      }>,
      logout: () => void
      verificarConfirmacion: (email: string) => Promise<boolean>

}
export const AuthContext = createContext({} as ContextProps);