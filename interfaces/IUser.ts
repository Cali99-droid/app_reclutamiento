import { IPersona } from "./IPersona";
import { IRol } from "./IRol";

export interface IUser {
    id         : number;
    email      : string;
    password   : string;
    // rol        : string;
    rol_id     :number
    persona_id :number
    persona    :IPersona
    oAuthImg?   :string
    rol        :IRol
      
}