import { categoria } from "@prisma/client";

export interface IJob {
    id           :number;
    titulo       : string;
    descripcion  : string;
    experiencia   : number;
    vacantes     : number;
    sueldoOfertado : number;
    vigencia:Date |string;
    gradoId : number;
    estadoId: number;
    estado:{
        id:number
        nombre:string
    }
    grado:{
        nombre:string
    }
    _count:{ postulante_x_convocatoria: number }
    categoria_id:number;
    categoria:categoria;

}