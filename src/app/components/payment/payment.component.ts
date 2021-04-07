import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentInfo } from 'src/app/models/paymentInfo';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardOwner: string;
  paymentInfo: PaymentInfo;
  cardConfirmation:boolean;

  constructor(private toastrService: ToastrService, private paymentService:PaymentService) {}

  ngOnInit(): void {}

  processPayment() {
    console.log(
      this.cardNumber +
        ' ' +
        this.expirationDate +
        ' ' +
        this.cvc +
        ' ' +
        this.cardOwner
    );
    if (this.cardNumber && this.expirationDate && this.cvc && this.cardOwner) {
      this.paymentInfo = {
        cardNumber: this.cardNumber,
        expirationDate: this.expirationDate,
        cvc: this.cvc,
        cardOwner: this.cardOwner,
      };
      this.confirmPayment(this.paymentInfo);
    }else {
      
      this.toastrService.error(" Please fill all the blanks",'Failed!');
    }
 
  }
  confirmPayment(paymentInfo:PaymentInfo){
    this.paymentService.confirmPayment(paymentInfo).subscribe(response=>{
      this.cardConfirmation = response.success;
      console.log(response.success);
      if(this.cardConfirmation) this.toastrService.success('Success!');
      else this.toastrService.error("Please fill the blanks in suitable the format",'Failed!');
    })
    
  }

}
