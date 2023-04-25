import { FC, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './'
import { IUser } from '@/interfaces';
import { reclutApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser
}

const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)

    const { data, status } = useSession();


    useEffect(() => {

        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
        }

    }, [status, data])



    const registerUser = async (nombre: string, apellidoPat: string, apellidoMat: string, email: string, password: string, fechaNac: Date): Promise<{ hasError: boolean; message?: string }> => {

        try {
            const { data } = await reclutApi.post('/user/register', { nombre, apellidoPat, apellidoMat, email, password, fechaNac });
            console.log(data)
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });

            return {
                hasError: false
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }
    const logout = () => {


        signOut();
        // router.reload();   Cookies.remove('token');
    }



    return (
        <AuthContext.Provider value={{
            ...state,

            registerUser,
            logout
        }}>
            {children}

        </AuthContext.Provider>
    )
}