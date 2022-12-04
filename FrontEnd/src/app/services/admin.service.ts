import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  //login by admin
  adminLogin(authCredentials:any) {
    return this._http.post(environment.apiBaseUrl + '/api/admin-authenticate', authCredentials, this.noAuthHeader);
  }

  //remove a food item
  removeFood(food:any) { 
    return this._http.post(environment.apiBaseUrl + '/api/remove-food',food,this.noAuthHeader);
  }

  //get List of All NGO
  getNgos() { 
    return this._http.get(environment.apiBaseUrl + '/api/get-ngos',this.noAuthHeader);
  }

  //get List of All Restaurants
  getRestaurants(){
    return this._http.get(environment.apiBaseUrl + '/api/get-restaurants',this.noAuthHeader);
  }

  //remove an NGO from the System
  removeNgo(ngo:any) {
    return this._http.post(environment.apiBaseUrl + '/api/remove-ngo',ngo,this.noAuthHeader);
  }

  //remove an Restaurant from the system
  removeRestaurant(ngo:any) {
    return this._http.post(environment.apiBaseUrl + '/api/remove-restaurant',ngo,this.noAuthHeader);
  }

}
