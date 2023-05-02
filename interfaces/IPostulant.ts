import { persona } from "@prisma/client";

export interface IPostulant {
    id:number
    telefono:string,
    direccion:string,
    nacimiento:Date,
    tipoId        : number,
    numeroDocumento   : string,
    sueldo: number,
    persona:persona
    
}