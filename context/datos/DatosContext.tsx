import { createContext } from 'react';


interface ContextProps {
    prop: boolean;
    activeStep: number



    handleNext: () => void,
    handleBack: () => void
}
export const DatosContext = createContext({} as ContextProps);