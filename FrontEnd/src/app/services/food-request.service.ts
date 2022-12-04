import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  addFoodRequest(foodRequest:any){
    console.log(foodRequest);
    return this.http.post(environment.apiBaseUrl + '/api/add-food-request',foodRequest,this.noAuthHeader);
  }
}
