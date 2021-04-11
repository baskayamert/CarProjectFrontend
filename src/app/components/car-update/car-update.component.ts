import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  currentCarDto:CarDto;

  carUpdateForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private toastrService:ToastrService, 
    private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDtoById(params["carId"]);
      }
    })
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId:["",Validators.required],
      findexPoints:["",Validators.required],
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

  getCarDtoById(carId:number){
    this.carService.getCarDtoById(carId).subscribe(response=>{
      this.currentCarDto = response.data;
      this.carUpdateForm.patchValue({
        brandId:response.data.brandId,
        findexPoints:response.data.findexPoints,
        colorId:response.data.colorId,
        carName:response.data.carName,
        modelYear:response.data.modelYear,
        dailyPrice:response.data.dailyPrice,
        description:response.data.description
      })

    });
  }
}
