import { Component, OnInit } from '@angular/core';
import { CourproviderService } from '../courprovider.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Cour } from '../models/cour.model';
import { User } from '../models/user.model';
import { SessionproviderService } from '../sessionprovider.service';

@Component({
  selector: 'app-cours-add',
  templateUrl: './cours-add.component.html',
  styleUrls: ['./cours-add.component.css']
})
export class CoursAddComponent implements OnInit {
  title="Ajouter un nouveau cour";
  cour:Cour=new Cour();
  droit={
    admin:false,
    user:false,
    visiteur:false
  }
  constructor(private courproviderService: CourproviderService, private router: Router,
    private sessionprovider:SessionproviderService) {
    if(this.sessionprovider.user.roles.find(nom => nom == 'user'))this.droit.user=true;
      if(this.sessionprovider.user.roles.find(nom => nom == 'admin'))this.droit.admin=true;
      if(this.sessionprovider.user.roles.find(nom => nom == 'visiteur'))this.droit.visiteur=true;
   }

  ngOnInit() {
    this.sessionprovider.auth();
    if(!this.droit.admin||!this.droit.user)
    this.router.navigate(['/cours/public']);
  }

   async addCour(addForm: NgForm) {
    this.cour = addForm.form.value;
    let user:User;
    user=JSON.parse(localStorage.getItem("user"));
    if(user==null)return;
    let cour:Cour=new Cour();
    cour.copie(this.cour);
    //user.roles=[];
   // user.cours=[];
    this.cour.user=user;
    console.log(this.cour);
    await  this.courproviderService.createCour(this.cour).then((cour)=>{
      console.log("Cour apres enregistrement ",cour);
    });
    console.log(this.router.navigate(['cours']));
    
  }

}
