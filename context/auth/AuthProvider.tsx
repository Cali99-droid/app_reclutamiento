import { FC, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './'
import { IUser } from '@/interfaces';
import { reclutApi } from '@/apies';
import Cookies from 'js-cookie';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';


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



    const registerUser = async (nombre: string, apellidoPat: string, apellidoMat: string, email: string, password: string, fechaNac: Date, tipoId: number, numeroDocumento: string): Promise<{ hasError: boolean; message?: string }> => {

        try {
            const { data } = await reclutApi.post('/user/register', { nombre, apellidoPat, apellidoMat, email, password, fechaNac, tipoId, numeroDocumento });

            // const { token, user } = data;
            // Cookies.set('token', token);
            // dispatch({ type: '[Auth] - Login', payload: user });

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
    const [noConfirm, setNoConfirm] = useState(false)
    const verificarConfirmacion = async (email: string) => {
        const { data } = await reclutApi.get(`/user/${email}`);
        if (data.user) {
            if (data.user.confirmado === 1) {

                setNoConfirm(false)
                return true;
            } else {
                setNoConfirm(true)
                return false
            }
        } else {
            return {
                hasError: true,
                message: 'No se encontrar esta cuenta'
            }
        }



    }

    const updateUser = async (idPersona: number, nombre: string, apellidoPat: string, apellidoMat: string, email: string, password: string, newPassword: string): Promise<{ hasError: boolean; message?: string }> => {

        try {
            const { data } = await reclutApi.put('/user/register', { idPersona, nombre, apellidoPat, apellidoMat, email, password, newPassword });

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

    const forgotPassword = async (email: string): Promise<{ hasError: boolean; message?: string }> => {

        try {
            const { data } = await reclutApi.post('/user/forgot', { email });

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
                message: 'No se pudo recuperar el usuario - intente de nuevo'
            }
        }
    }

    const updatePassword = async (newPassword: string, token: string): Promise<{ hasError: boolean; message?: string }> => {

        try {
            const { data } = await reclutApi.put('/user/forgot', { newPassword, token });



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
                message: 'No se pudo recuperar el usuario - intente de nuevo'
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            verificarConfirmacion,
            registerUser,
            noConfirm,
            updateUser,
            forgotPassword,
            updatePassword,
            logout
        }}>
            {children}

        </AuthContext.Provider>
    )
}