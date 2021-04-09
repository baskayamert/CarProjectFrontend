import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm : FormGroup;//as

  constructor(private formBuilder: FormBuilder, private toastrService:ToastrService, private carService:CarService) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }
  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(response=>{
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
