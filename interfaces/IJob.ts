export interface IJob {
    id           :number;
    titulo       : string;
    descripcion  : string;
    experiencia   : number;
    vacantes     : number;
    sueldoOfertado : number;
    gradoId : number;
    estadoId: number;
    estado:{
        nombre:string
    }
    grado:{
        nombre:string
    }
}