import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  //save a new NGO user to the system
  saveNgoUser(user:any){
    return this._http.post(environment.apiBaseUrl+'/api/ngo-register',user,this.noAuthHeader);
  }

  //save a new Restaurant to the system
  saveRestUser(user:any){
    return this._http.post(environment.apiBaseUrl+'/api/restaurant-register',user,this.noAuthHeader);
  }

  //log in to the system by NGO or Restaurant Representative
  login(authCredentials:any) {
    if(authCredentials.userType=="NGO Representative")
      return this._http.post(environment.apiBaseUrl + '/api/ngo-authenticate', authCredentials, this.noAuthHeader);
    else 
      return this._http.post(environment.apiBaseUrl + '/api/restaurant-authenticate', authCredentials, this.noAuthHeader);
  }

  //get Current logged in user
  getUser() {
    return this._http.get(environment.apiBaseUrl + '/api/userprofile');
  }

  
  sendRecoveryEmail(recoveryData:any){
    console.log("hello")
    return this._http.post(environment.apiBaseUrl + '/api/recovery-mail',recoveryData,this.noAuthHeader);
  }

  


  getFoodItems(){
    return this._http.get(environment.apiBaseUrl + '/api/get-foodItems',this.noAuthHeader);
  }

  addNewFood(foodItem:any){
    console.log(foodItem);
    return this._http.post(environment.apiBaseUrl + '/api/add-food',foodItem,this.noAuthHeader);
  }

}
