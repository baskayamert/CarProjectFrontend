import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = 'https://localhost:44349/api/';
  constructor(private httpClient: HttpClient) { }
  add(imagePath:FormData){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"carImages/add",imagePath);
  }
}
