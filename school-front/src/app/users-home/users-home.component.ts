import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserproviderService } from '../userprovider.service';
import { SessionproviderService } from '../sessionprovider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent implements OnInit {
  titre="Gestion des utilisateurs";
  users:User[];
  order=false;
  column:string;
  usersbase:User[];
  droit={
    admin:false,
    user:false,
    visiteur:false
  }
  constructor(private userproviderService:UserproviderService,
    private router: Router,private sessionprovider:SessionproviderService) {
      if(this.sessionprovider.user.roles.find(nom => nom == 'user'))this.droit.user=true;
      if(this.sessionprovider.user.roles.find(nom => nom == 'admin'))this.droit.admin=true;
      if(this.sessionprovider.user.roles.find(nom => nom == 'visiteur'))this.droit.visiteur=true;
  }

  ngOnInit() {
    this.sessionprovider.auth();
    if(!this.droit.admin)
    this.router.navigate(['/cours/public']);
    
    this.getAllUsers();
  }
  async getAllUsers() {
    this.users = new Array<User>();
    await this.userproviderService.getAllUsers().then((users)=>{
      if(users!=null)
      this.users=users;
    });
    this.usersbase = this.users;
    console.log("Les utilisateurs de la plateforme",this.users);
  }
  
  async ajouterOuRetirer(user:User,role:string){
    if(user.roles.indexOf(role)>-1)
    user.roles.splice(user.roles.indexOf(role),1);
    else user.roles.push(role);
    console.log(user.roles);
    console.log(user);
    await this.userproviderService.updateUser(user);
    this.getAllUsers();
  }
   
  async sortList(column: string) {
    if (column.includes(this.column))
      this.order = !this.order;
    else
      this.order = true;
    this.column = column;
    console.log(this.column + ' ' + this.order);
    this.users = new Array<User>();
    await this.userproviderService.getCoursSort(this.column, this.order).then((users) => {
      if (users != null) {
        this.users = users;
      }
    });
    this.usersbase = this.users;

  }
  onKey(event: any) {
    if(event.target.value!="")
    this.users=this.usersbase.filter
    (user=>user!=null&&user.login!=""&&user.login.includes(event.target.value));
    else this.users=this.usersbase;
  }

  ajouter(){
    this.router.navigate(['/users/add']);
  }
  
  async supprimer(user:User){
    await this.userproviderService.deleteUser(user.id).then((cour) => {
      console.log(cour);
    });
    this.getAllUsers();
  }

}
