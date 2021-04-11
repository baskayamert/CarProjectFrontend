import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  basePath: string = 'https://localhost:44349';
  defaultPath: string = '/uploads/default.jpg';

  cars:Car[] = [];
  carDtos:CarDto[] = [];
  filterText="";
 
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
     this.activatedRoute.params.subscribe(params=>{
       if(params["brandId"]){
         this.getCarDtosByBrand(params["brandId"]);
       }else if(params["colorId"]){
         this.getCarDtosByColor(params["colorId"]);
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
      this.checkImagePaths();
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
   
     
   getRole(){
      return this.localStorageService.get("role") == "admin";
   }

  checkImagePaths(){
    this.carDtos.forEach(c=>{
      if(c.imagePath==null){
        
        c.imagePath = this.defaultPath;
        console.log(c.imagePath)
      } 
    })
  }
  
}
