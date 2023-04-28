import { persona } from "@prisma/client";

export interface IPostulant {
    telefono:string,
    direccion:string,
    nacimiento:Date,
    tipoId        : number,
    numeroDocumento   : string,
    experiencia     : number,
    sueldo: number,
    especialidad: string,
    gradoId : number ,
    persona:persona
    
}