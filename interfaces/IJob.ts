export interface IJob {
    id           :number;
    titulo       : string;
    descripcion  : string;
    grado        : string;
    experiencia   : number;
    vacantes     : number;
    sueldoOfertado : number;
    gradoId : number;
    estadoId: number;
}