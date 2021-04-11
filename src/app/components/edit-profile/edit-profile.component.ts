import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerDto } from 'src/app/models/customerDto';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  currentCustomer:CustomerDto;
  userUpdateForm : FormGroup;

  constructor(private localStorageService:LocalStorageService, private customerService:CustomerService,
    private toastrService:ToastrService,private formBuilder: FormBuilder,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createCustomerAddForm();
    this.getCurrentCustomer();
  }

  createCustomerAddForm(){
    this.userUpdateForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email: [""],
      phoneNumber:[""],
      address:[""],
      userId:[""],
      passwordHash:[""],
      passwordSalt:[""],
      status:[""]


    });
  }
  getCurrentCustomer(){
    this.customerService.getCustomerByEmail(this.localStorageService.get("currentCustomerEmail")).subscribe(response=>{
      this.currentCustomer = response.data;
      this.userUpdateForm.patchValue({
        firstName:response.data.firstName,
        lastName:response.data.lastName,
        email:response.data.email,
        userId:response.data.userId,
      })
      this.getCurrentUser(this.currentCustomer.userId);
    });
  }
  getCurrentUser(userId:number){
    this.userService.getUserById(userId).subscribe(response=>{
      this.userUpdateForm.patchValue({
        passwordHash : response.data.passwordHash,
        passwordSalt : response.data.passwordSalt,
        status : response.data.status,
        phoneNumber : response.data.phoneNumber,
        address : response.data.address
      })
    })
  }
  update(){
    console.log(this.userUpdateForm.value);
    if(this.userUpdateForm.valid){
      let userModel = Object.assign({},this.userUpdateForm.value);
      this.userService.update(userModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success!") 
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Verification Error");
          }
        }
      });
    }else{
      this.toastrService.error("Please do not left missing parts!","Warning!");
    }
  }
}
