import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44349/api/';
  constructor(private httpClient:HttpClient) { }

  update(user:User){
    let newPath = this.apiUrl + "users/update";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }
  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "users/getuserbyid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
