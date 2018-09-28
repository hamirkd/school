import { Component, OnInit } from '@angular/core';
import { Cour } from '../models/cour.model';
import { CourproviderService } from '../courprovider.service';
import { Router } from '@angular/router';
import { SessionproviderService } from '../sessionprovider.service';

@Component({
  selector: 'app-cours-public',
  templateUrl: './cours-public.component.html',
  styleUrls: ['./cours-public.component.css']
})
export class CoursPublicComponent implements OnInit {

  titre="La liste des cours publiés";
  cours:Cour[];
  coursbase:Cour[];
  order=true;
  column:string;
  droit={
    admin:false,
    user:false,
    visiteur:false
  }
  constructor(private courprovider:CourproviderService,private router:Router
    ,private sessionprovider:SessionproviderService) {
      console.clear();
      console.log('user auth ==== '+JSON.stringify(this.sessionprovider.user));
      if(this.sessionprovider.user.roles.find(nom => nom == 'user'))this.droit.user=true;
      if(this.sessionprovider.user.roles.find(nom => nom == 'admin'))this.droit.admin=true;
      if(this.sessionprovider.user.roles.find(nom => nom == 'visiteur'))this.droit.visiteur=true;
      console.log(this.droit);
     }

  ngOnInit() {
    this.sessionprovider.auth();
    this.touscourspublics();
  }
  async touscourspublics() {
    this.cours = new Array<Cour>();
    await  this.courprovider.getPublicCours().then((cours) => {
        if (cours != null) {
          this.cours = cours;
        }});
        for(let cour of this.cours){
          while(cour.contenu!=cour.contenu.replace('\n','<br>')){
            cour.contenu=cour.contenu.replace('\n','<br>');
          }
          while(cour.contenu!=cour.contenu.replace('    ','&nbsp;&nbsp;&nbsp;&nbsp;')){
            cour.contenu=cour.contenu.replace('    ','&nbsp;&nbsp;&nbsp;&nbsp;');
          }
        }
        this.coursbase=this.cours;
        console.log("La liste des cours publiés ",this.coursbase);
        console.log(this.sessionprovider.user);
  }

  onKey(event: any) { // without type info
    if(event.target.value!="")
    this.cours=this.coursbase.filter
    (cour=>cour.user!=null&&cour.user.login!=""&&cour.user.login.includes(event.target.value));
    else this.cours=this.coursbase;
  }
  
  async sortList(column: string) {
    if (column.includes(this.column))
      this.order = !this.order;
    else
      this.order = true;
    this.column = column;
    console.log(this.column + ' ' + this.order);
    this.cours = new Array<Cour>();
    await this.courprovider.getCoursSort(this.column, this.order).then((cours) => {
      if (cours != null) {
        this.cours = cours;
      }
    });
    for(let cour of this.cours){
      while(cour.contenu!=cour.contenu.replace('\n','<br>')){
        cour.contenu=cour.contenu.replace('\n','<br>');
      }
      while(cour.contenu!=cour.contenu.replace('    ','&nbsp;&nbsp;&nbsp;&nbsp;')){
        cour.contenu=cour.contenu.replace('    ','&nbsp;&nbsp;&nbsp;&nbsp;');
      }
    }
    this.coursbase = this.cours;
    console.log(this.coursbase);

  }
}
