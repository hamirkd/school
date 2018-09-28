import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Cour } from '../models/cour.model';
import { CourproviderService } from '../courprovider.service';
import { Router } from '@angular/router';
import { UserproviderService } from '../userprovider.service';
import { SessionproviderService } from '../sessionprovider.service';
import { HtmlTagDefinition } from '@angular/compiler';

@Component({
  selector: 'app-cours-home',
  templateUrl: './cours-home.component.html',
  styleUrls: ['./cours-home.component.css']
})
export class CoursHomeComponent implements OnInit {

  titre = "Mes cours";
  courspublics: boolean = false;
  cours: Cour[];
  coursbase: Cour[] = [];
  column: string;
  order = false;
  droit = {
    admin: false,
    user: false,
    visiteur: false
  }
  constructor(private courproviderService: CourproviderService,
    private userproviderService: UserproviderService, private router: Router,
    private sessionprovider: SessionproviderService) {
    console.clear();
    console.log('user auth ==== ' + JSON.stringify(this.sessionprovider.user));
    if (this.sessionprovider.user.roles.find(nom => nom == 'user')) this.droit.user = true;
    if (this.sessionprovider.user.roles.find(nom => nom == 'admin')) this.droit.admin = true;
    if (this.sessionprovider.user.roles.find(nom => nom == 'visiteur')) this.droit.visiteur = true;
    console.log(this.droit);
  }

  ngOnInit() {
    this.sessionprovider.auth();
    if (!this.droit.admin && !this.droit.user)
      this.router.navigate(['/cours/public']);
    this.mescours();
  }

  async mescours() {
    await this.userproviderService.updateUserInfo(this.sessionprovider.user);
    this.cours = this.sessionprovider.update().cours;
    this.titre = "Mes Cours";
    this.courspublics = false;
    for(let cour of this.cours){
      while(cour.contenu!=cour.contenu.replace('\n','<br>')){
        cour.contenu=cour.contenu.replace('\n','<br>');
      }
      while(cour.contenu!=cour.contenu.replace('    ','&nbsp;&nbsp;&nbsp;&nbsp;')){
        cour.contenu=cour.contenu.replace('    ','&nbsp;&nbsp;&nbsp;&nbsp;');
      }
    }

  }
  async touscourspublics() {
    this.cours = new Array<Cour>();
    await this.courproviderService.getPublicCours().then((cours) => {
      if (cours != null) {
        this.cours = cours;
      }
    });
    this.titre = "Les cours publiés";
    this.courspublics = true;
    this.coursbase = this.cours;
    console.log(this.coursbase);
  }
  async publier(cour: Cour) {
    if (cour.visibilite == true)
      cour.visibilite = false;
    else cour.visibilite = true;
    await this.courproviderService.updateCour(cour).then((cour) => {
      console.log(cour);
    });
    this.mescours();
  }
  async supprimer(cour: Cour) {
    await this.courproviderService.deleteCour(cour.id).then((cour) => {
      console.log(cour);
    });
    this.mescours();
  }

  onKey(event: any) { // without type info
    if (event.target.value != "")
      this.cours = this.coursbase.filter
        (cour => cour.user != null && cour.user.login != "" && cour.user.login.includes(event.target.value));
    else this.cours = this.coursbase;
  }

  ajouter() {
    this.router.navigate(['/cours/add']);
  }

  async sortList(column: string) {
 /*   if (column.includes(this.column))
      this.order = !this.order;
    else
      this.order = true;
    this.column = column;
    console.log(this.column + ' ' + this.order);
    this.cours = new Array<Cour>();
    await this.courproviderService.getCoursSort(this.column, this.order).then((cours) => {
      if (cours != null) {
        this.cours = cours;
      }
    });
    this.titre = "Les cours publiés";
    this.courspublics = true;
    this.coursbase = this.cours;
    console.log(this.coursbase);*/

  }

}
