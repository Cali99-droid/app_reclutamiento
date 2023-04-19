import { convocatoria } from '@prisma/client';
export interface IConvocatoriaPostulante {
    id: number
    convocatoria_id: number
    postulante_id: number
    convocatoria: convocatoria
 
 
}