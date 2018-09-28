import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { DataU } from './models/datau.model';

@Injectable({
  providedIn: 'root'
})
export class SessionproviderService {

  user: User;
  datau:DataU;
  constructor(private router: Router) { 
    this.user=JSON.parse(localStorage.getItem('user'));
  }

  auth() {
    if (this.user == null)
      this.router.navigate(['connexion']);
  }

  redirectAfterLogin(){
    this.auth();
    if(this.user.roles==null)this.router.navigate(['cours/public']);
    console.log("les données de l'utlisateur ==> ",this.user);
    
   if (this.user.roles.find(role => role.nom == 'user'))
      this.router.navigate(['/cours'])
    else this.router.navigate(['/cours/public']);
  }

  deconnexion(){
    this.user=null;
    localStorage.removeItem('user');
    this.auth();
  }

  save(user:User){
    if(!user)return;
    localStorage.setItem('user',JSON.stringify(user));
    this.user=JSON.parse(localStorage.getItem('user'));
  }
  update(){
    this.user=JSON.parse(localStorage.getItem('user'));
    return this.user;
  }

}
