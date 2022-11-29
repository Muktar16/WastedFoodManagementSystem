import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  saveNgoUser(user:any){
    console.log("Data Reache in saveNgoUser Service Function");
    console.log(user);
    return this._http.post(environment.apiBaseUrl+'/api/ngo-register',user,this.noAuthHeader);
  }

  saveRestUser(user:any){
    console.log("Data Reache in saveRestUser Service Function");
    console.log(user);
    return this._http.post(environment.apiBaseUrl+'/api/rest-register',user,this.noAuthHeader);
  }

  login(authCredentials:any) {
    return this._http.post(environment.apiBaseUrl + '/api/authenticate', authCredentials, this.noAuthHeader);
  }
  adminLogin(authCredentials:any) {
    return this._http.post(environment.apiBaseUrl + '/api/admin-authenticate', authCredentials, this.noAuthHeader);
  }

  setToken(token: any) {
    localStorage.setItem('token', token);
  }

}
