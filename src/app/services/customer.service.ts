import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDto } from '../models/customerDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:44349/api/';
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerByEmail(email:string){
    let newPath = this.apiUrl + "customers/getcustomerbyemail?email="+email;
    return this.httpClient.get<SingleResponseModel<CustomerDto>>(newPath);
  }
  update(customer:Customer){
    let newPath = this.apiUrl + "customers/update";
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }
}
