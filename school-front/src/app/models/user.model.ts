import { Cour } from "./cour.model";
import { Role } from "./role.model";

export class User {
    id: string;
    login: string;
    password: string;
    cours:Cour[];
    roles:any[];
  }