import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserproviderService } from '../userprovider.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { SessionproviderService } from '../sessionprovider.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  titre="Création d'utilisateur";
  newUser:User=new User();
  message="";
  droit={
    admin:false,
    user:false,
    visiteur:true
  }

  constructor(private userproviderService:UserproviderService, private router: Router,
    private sessionprovider:SessionproviderService) {
      if(this.sessionprovider.user.roles.find(nom => nom == 'user'))this.droit.user=true;
      if(this.sessionprovider.user.roles.find(nom => nom == 'admin'))this.droit.admin=true;
      if(this.sessionprovider.user.roles.find(nom => nom == 'visiteur'))this.droit.visiteur=true;
     }

  ngOnInit() {
    this.sessionprovider.auth();
    if(!this.droit.admin)
    this.router.navigate(['/cours']);
  }

  createUser(userForm: NgForm) {
    //this.newUser=userForm.form.value;
    console.log(this.newUser);
    this.newUser.roles=[];
    if(this.droit.admin)this.newUser.roles.push("admin");
    if(this.droit.visiteur)this.newUser.roles.push("visiteur");
    if(this.droit.user)this.newUser.roles.push("user");
    
    this.userproviderService.createUser(this.newUser).then((user)=>{
      if(user!=null){
      this.message="Création avec succès"
    }else
      this.message="Ce compte existe déjà";
    });
  }

}
