import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { CustomerDto } from 'src/app/models/customerDto';
import { PaymentInfo } from 'src/app/models/paymentInfo';
import { Rental } from 'src/app/models/rental';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentInfo: PaymentInfo;
  cardConfirmation:boolean;
  currentCarId:number;
  currentCustomer:CustomerDto;
  creditCardAddForm : FormGroup;

  constructor(private toastrService: ToastrService, private paymentService:PaymentService,
     private router: Router, private activatedRoute:ActivatedRoute,
     private customerService:CustomerService, private localStorageService:LocalStorageService,
     private rentalService:RentalService,
     private creditCardService:CreditCardService,
     private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createCreditCardAddForm();
    this.getCurrentCustomer();
  }

  createCreditCardAddForm(){
    this.creditCardAddForm = this.formBuilder.group({
      cardOwner:["",Validators.required],
      cvc:["",Validators.required],
      expirationDate: ["",Validators.required],
      cardNumber:["",Validators.required],

    });
  }


  processPayment() {
    if(this.creditCardAddForm.valid){
      this.confirmPayment();
    }else {
         this.toastrService.error(" Please fill all the blanks",'Failed!');
         window.location.reload();
    }
    
   
 
  }
  confirmPayment(){
    let creditCardModel:CreditCard = Object.assign({customerId:this.localStorageService.get("customerId")},this.creditCardAddForm.value);
    
    this.paymentService.confirmPayment(creditCardModel).subscribe(response=>{
      this.cardConfirmation = response.success;
      console.log(response.success);
      if(this.cardConfirmation){
        this.toastrService.success('Success!');
        this.increaseFindexPoints();
        if (confirm("Do you want to save the credit card information?")) {
          this.addCreditCard(creditCardModel);
          this.toastrService.success("Credit card was added successfully","Success!");
          this.toastrService.info("You are being redirected to home page","For your information!");
        }else {
          this.toastrService.info("You are being redirected to home page","For your information!");
        }
        this.router.navigate(["cars"]);
        
      }else {
        this.toastrService.error("Please fill the blanks in the suitable format",'Failed!');
        window.location.reload();
      }
      
    })
    
  }
  getCurrentCustomer(){
    this.customerService.getCustomerByEmail(this.localStorageService.get("currentCustomerEmail")).subscribe(response=>{
      this.currentCustomer = response.data;
    });
  }
  updateFindexPoints(){
    this.customerService.update(this.currentCustomer).subscribe(response=>{
      this.addRental();
    });
  }
  increaseFindexPoints(){
    this.getCurrentCustomer();
    if(this.currentCustomer.findexPoints < 1900){
      this.currentCustomer.findexPoints += 50;
      this.updateFindexPoints();
    }
  }
  addRental(){
    let rental:Rental = Object.assign({ carId:this.localStorageService.get("carId"),
    customerId:this.localStorageService.get("customerId"),
    rentDate:this.localStorageService.get("startDate"),
    returnDate:this.localStorageService.get("finishDate")});
    this.rentalService.addRental(rental).subscribe(response=>{
    })

  }

  addCreditCard(creditCardModel:CreditCard){
     this.creditCardService.add(creditCardModel).subscribe(response=>{
     })
  }

}
