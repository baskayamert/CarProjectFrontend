import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, 
    private carService:CarService,private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      findexPoints:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      //imagePath:[""]
    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success!") 
        //this.addImageToDataBase();
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
  // addImageToDataBase(){
  //   this.carImageService.add(this.carAddForm.value.imagePath).subscribe(response=>{
  //     console.log(response);
  //   })
  // }
}
