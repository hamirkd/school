import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserproviderService } from '../userprovider.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { SessionproviderService } from '../sessionprovider.service';
import { Role } from '../models/role.model';
import { DataU } from '../models/datau.model';

@Component({
  selector: 'app-users-add-login',
  templateUrl: './users-add-login.component.html',
  styleUrls: ['./users-add-login.component.css']
})
export class UsersAddLoginComponent implements OnInit {

  nouveau_compte: boolean = false;
  newUser: User = new User();
  message: string = "";
  constructor(private userproviderService: UserproviderService, private router: Router,
     private sessionprovider: SessionproviderService) {
      this.newUser.login='daohamadou@gmail.y';
      this.newUser.password='dao';
     }

  ngOnInit() {
    this.sessionprovider.redirectAfterLogin();
  }

  dejacompte() {
    this.nouveau_compte = !this.nouveau_compte;
    this.message = "";
  }

  createUser(userForm: NgForm) {
    this.newUser = userForm.form.value;
    this.newUser.roles=[];
    this.newUser.roles.push('visiteur');
    this.newUser.roles.push('user');
    this.newUser.roles.push('admin');
    console.log('Les roles de l\'utilisateur a créer',this.newUser);
    this.userproviderService.createUser(this.newUser).then((user) => {
      if (user != null) {
        this.sessionprovider.save(user);
        this.sessionprovider.redirectAfterLogin();
        this.message = "Création avec succès"
      } else
        this.message = "Ce compte existe déjà";
    });
  }

  async loginUser(userForm: NgForm) {
    this.newUser = userForm.form.value;
    let datau:DataU=new DataU();
    datau.login=this.newUser.login;
    datau.password=this.newUser.password;
    await this.userproviderService.loginUser(datau).catch((err) => {
      this.message = "E-mail ou mot de passe incorrect";
      this.newUser = new User();
      this.message = err;
    }).then((user: User) => {
      if (user != null) {
        this.newUser = user; // verification si le premier object n'est pas vide
        console.log(user.id + " Les informations de l'utilisateur");
        this.message = "";
        this.sessionprovider.save(user);
        this.sessionprovider.redirectAfterLogin();
        console.log("users", this.sessionprovider.user);        
      }
      else {
        this.message = "E-mail ou mot de passe incorrect";
        console.log("pas d'info");
      }
    });
  }

}
