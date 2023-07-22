import React, { PropsWithChildren, createContext, useContext } from 'react';
import Swal from 'sweetalert2';

export interface SweetAlertContextType {
    showAlert: (title: string, message: string) => Promise<boolean>;
}

const SweetAlertContext = createContext<SweetAlertContextType>({
    showAlert: async () => false,
});

export function useSweetAlert(): SweetAlertContextType {
    return useContext(SweetAlertContext);
}
interface Props extends PropsWithChildren {

}
export const SweetAlertProvider: React.FC<Props> = ({ children }) => {
    const showAlert = async (title: string, message: string) => {
        const result = await Swal.fire({
            title,
            text: message,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: true,
        });
        return result.isConfirmed;
    };

    return (
        <SweetAlertContext.Provider value={{ showAlert }}>
            {children}
        </SweetAlertContext.Provider>
    );
};
