import { IUser } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
      isLoggedIn: boolean;
      user?: IUser
      confirmado: boolean
      noConfirm: boolean
      registerUser: (nombre: string, apellidoPat: string, apellidoMat: string, email: string, password: string, fechaNac: Date) => Promise<{
            hasError: boolean;
            message?: string;
      }>,
      logout: () => void
      verificarConfirmacion: (email: string) => Promise<boolean>

}
export const AuthContext = createContext({} as ContextProps);