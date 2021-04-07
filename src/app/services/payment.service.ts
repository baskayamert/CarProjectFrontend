import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentInfo } from '../models/paymentInfo';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient:HttpClient) { }

  confirmPayment(paymentInfo : PaymentInfo):Observable<ResponseModel>{
    let newPath = this.apiUrl + "payments/confirmpayment?paymentInfo=";
    return this.httpClient.post<ResponseModel>(newPath,paymentInfo);
   
  }
}
