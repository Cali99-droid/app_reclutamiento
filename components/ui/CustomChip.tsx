import React from 'react';
import { Chip } from '@mui/material';

interface CustomChipProps {
    value: string;
}

export const CustomChip: React.FC<CustomChipProps> = ({ value }) => {
    const getColor = (status: string) => {
        switch (status) {
            case 'Inscrito':
                return 'info';
            case 'Apto a Contrato':
                return 'secondary';
            case 'Apto entrevista':
                return 'warning';
            case 'Apto evaluación':
                return 'primary';
            case 'No interesa':
                return 'error';
            case 'Contratado':
                return 'success';
            case '% Insuficiente':
                return 'error';

            default:
                return 'info';
        }
    };

    const color = getColor(value);

    return <Chip label={value} color={color} />;
};


