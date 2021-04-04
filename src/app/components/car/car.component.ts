import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[] = [];
  carDtos:CarDto[] = [];
  currentCarDto:CarDto;
 
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarDtosByBrand(params["brandId"]);
      }else if(params["colorId"]){
        this.getCarDtosByColor(params["colorId"]);
      }else if(params["carId"]){
        this.getCarDtoById(params["carId"]);
      }else{
        this.getCarDtos();
      }
     
     
    })
   
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;    
    })
  }
  getCarDtos(){
    this.carService.getCarDtos().subscribe(response=>{
      this.carDtos = response.data;
    })
  }
  getCarDtosByBrand(brandId:number){
    this.carService.getCarDtosByBrand(brandId).subscribe(response=>{
      this.carDtos = response.data;
    })
  }
  getCarDtosByColor(colorId:number){
    this.carService.getCarDtosByColor(colorId).subscribe(response=>{
      this.carDtos = response.data;
      console.log(colorId);
    })
  }
  setCurrentCarDto(carDto:CarDto){
    this.currentCarDto = carDto;
  }
  getCarDtoById(carId:number){
    this.carService.getCarDtoById(carId).subscribe(response=>{
      this.currentCarDto = response.data;
    })
  }
}
