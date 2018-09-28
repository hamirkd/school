
import { Injectable } from '@angular/core';
import { Cour } from './models/cour.model';
import { Headers, Http } from '@angular/http';
import { User } from './models/user.model';
@Injectable({
  providedIn: 'root'
})

export class CourproviderService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }
  getPublicCours(): Promise<Cour[]>{
    return this.http.get(this.baseUrl+'/api/cours/')
    .toPromise()
    .then(response=>response.json() as Cour[])
    .catch(this.handleError);
  }

  
  getCoursSort(column:string,order:boolean): Promise<Cour[]>{
    return this.http.get(this.baseUrl+'/api/cours//sort/'+column+'/'+order)
    .toPromise()
    .then(response=>response.json() as Cour[])
    .catch(this.handleError);
  }

  getMyCours(user:User): Promise<Cour[]>{
    return this.http.get(this.baseUrl+'/api/cours/users/'+user.id)
    .toPromise()
    .then(response=>response.json() as Cour[])
    .catch(this.handleError);
  }

  createCour(courData:Cour):Promise<Cour>{
    return this.http.post(this.baseUrl+'/api/cours',courData)
    .toPromise()
    .then(response => response.json() as Cour)
    .catch(this.handleError);
  }

  updateCour(courData: Cour): Promise<Cour>{
    return this.http.put(this.baseUrl+'/api/cours/'+courData.id,courData)
    .toPromise()
    .then(response=>response.json() as Cour)
    .catch(this.handleError);
  }

  deleteCour(id: string):Promise<any>{
    return this.http.delete(this.baseUrl+'/api/cours/'+id)
    .toPromise()
    .catch(this.handleError);
  }

  getCoursByTitre(titre:string):Promise<Cour[]>{
    return this.http.get(this.baseUrl+'/api/cours/titre/'+titre)
    .toPromise()
    .then(response => response.json() as Cour[])
    .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}