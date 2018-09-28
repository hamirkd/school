import { User } from "./user.model";

export class Cour {
    id: string;
    titre: string;
    contenu: string;
    user:User;
    visibilite:boolean;
    createdAt: Date;

    public copie (cour:Cour) {
      this.id=cour.id;
      this.titre=cour.titre;
      this.contenu=cour.contenu;
      this.visibilite=cour.visibilite;
      this.createdAt=cour.createdAt;
      return this;
    }
  }