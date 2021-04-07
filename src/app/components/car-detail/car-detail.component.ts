import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  basePath:string = "https://localhost:44349";
  defaultPath:string = "/uploads/default.jpg";
  carImages:CarImage[] = [];
  newCarImage:CarImage;
  currentCarDto:CarDto;
  rentalState= "";
  startDate:Date;
  finishDate:Date;

  constructor(private carService : CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDtoById(params["carId"]);
        this.getImageByCarId(params["carId"]);
      }
    })
    
  }

  getCarDtoById(carId:number){
    this.carService.getCarDtoById(carId).subscribe(response=>{
      this.currentCarDto = response.data;
      if(this.currentCarDto.rentalState) this.rentalState = "Available";
      else this.rentalState = "Not available";
    });
  }

  getImageByCarId(carId:number){
    this.carService.getImageByCarId(carId).subscribe(response=>{
      this.carImages=response.data;
      if(this.carImages == null){
        this.newCarImage = {id:0, carId:carId , imagePath: this.defaultPath, date: new Date() };
      }
      console.log(this.carImages[0].imagePath);
    });
  }
}
