import { IUser } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps{
      isLoggedIn:boolean;
      user?: IUser

      registerUser: (nombre: string,apellidoPat:string,apellidoMat:string, email: string, password: string) => Promise<{
            hasError: boolean;
            message?: string;
        }>,
        logout: () => void
      
}
export const AuthContext  = createContext({}as ContextProps);