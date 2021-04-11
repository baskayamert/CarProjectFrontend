import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = 'https://localhost:44349/api/';
  constructor(private httpClient:HttpClient) { }

  getRoleByUserId(userId:number):Observable<SingleResponseModel<Role>>{
    let newPath = this.apiUrl + "users/getrolebyuserid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<Role>>(newPath);
  }
}
