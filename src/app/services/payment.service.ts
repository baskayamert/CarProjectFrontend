import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { PaymentInfo } from '../models/paymentInfo';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44349/api/';

  constructor(private httpClient:HttpClient) { }

  confirmPayment(creditCard : CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "payments/confirmpayment?paymentInfo=";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
   
  }
}
