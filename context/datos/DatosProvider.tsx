import { FC, useReducer, useState } from 'react';
import { DatosContext, datosReducer } from './';


export interface DatosState {
    prop: boolean
}

const DATOS_INITIAL_STATE: DatosState = {
    prop: false
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const DatosProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(datosReducer, DATOS_INITIAL_STATE)


    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };



    return (
        <DatosContext.Provider value={{
            ...state,
            activeStep,
            handleNext,
            handleBack,





        }}>
            {children}

        </DatosContext.Provider>
    )
}