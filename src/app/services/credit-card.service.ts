import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl = 'https://localhost:44349/api/';
  constructor(private httpClient: HttpClient) { }

  add(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"creditcards/add",creditCard);
  }
  update(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"creditcards/update",creditCard);
  }
  getCreditCardByCustomerId(customerId:number):Observable<SingleResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcards/getcreditcardbycustomerid?customerId="+customerId;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }
}
