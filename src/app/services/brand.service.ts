import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = 'https://localhost:44349/api/';
  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getAll";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/add",brand);
  }
  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/update",brand);
  }
}
