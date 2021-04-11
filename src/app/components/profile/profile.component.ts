import { Component, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/models/creditCard';
import { CustomerDto } from 'src/app/models/customerDto';
import { User } from 'src/app/models/user';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentCustomer:CustomerDto;
  currentUser:User;
  currentUserCreditCard:CreditCard;

  constructor(private localStorageService:LocalStorageService, 
    private customerService:CustomerService,
    private userService:UserService, private creditCardService:CreditCardService ) { }

  ngOnInit(): void {
    this.getCurrentCustomer();
  }

  getCurrentCustomer(){
    this.customerService.getCustomerByEmail(this.localStorageService.get("currentCustomerEmail")).subscribe(response=>{
      this.currentCustomer = response.data;
      this.getCurrentUser(this.currentCustomer.userId);
      this.getCreditCardByCustomerId();
    });
  }
  getCurrentUser(userId:number){
    this.userService.getUserById(userId).subscribe(response=>{
      this.currentUser = response.data;
    })
  }
  getCreditCardByCustomerId(){
    this.creditCardService.getCreditCardByCustomerId(this.currentCustomer.customerId).subscribe(response=>{
      console.log(response);
      this.currentUserCreditCard = response.data;
    })
  }
}
