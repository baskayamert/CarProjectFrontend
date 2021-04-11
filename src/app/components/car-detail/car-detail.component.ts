import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CustomerDto } from 'src/app/models/customerDto';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  basePath: string = 'https://localhost:44349';
  defaultPath: string = '/uploads/default.jpg';
  carImages: CarImage[] = [];
  newCarImage: CarImage;
  currentCarDto: CarDto;
  rentalState = '';
  startDate: Date;
  finishDate: Date;
  currentCustomer: CustomerDto;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getCurrentCustomerFindexPoint();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDtoById(params['carId']);
        this.getImageByCarId(params['carId']);
      }
    });
  }
  getCarDtoById(carId: number) {
    this.carService.getCarDtoById(carId).subscribe((response) => {
      this.currentCarDto = response.data;
      if (this.currentCarDto.rentalState) this.rentalState = 'Available';
      else this.rentalState = 'Not available';
    });
  }

  getImageByCarId(carId: number) {
    this.carService.getImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      if (this.carImages == null) {
        this.newCarImage = Object.assign({
          carId: carId,
          imagePath: this.defaultPath,
          date: new Date(),
        })
             
      }
    });
  }
  rentCheck() {
    if (this.startDate <= this.finishDate) {
      if (
        this.currentCarDto.findexPoints <= this.currentCustomer.findexPoints
      ) {
        if (this.currentCarDto.rentalState) {
          this.localStorageService.add('startDate', this.startDate);
          this.localStorageService.add('finishDate', this.finishDate);
          this.localStorageService.add('carId', this.currentCarDto.carId);
          this.localStorageService.add(
            'customerId',
            this.currentCustomer.customerId
          );

          this.router.navigate([
            'cars/' + this.currentCarDto.carId + '/payment',
          ]);
        }
        else{
          this.toastrService.error('The car is not available!', 'Error!');
        }
      } else {
        this.toastrService.error('Insufficient findex points!', 'Error!');
      }
    } else {
      this.toastrService.error('You cannot choose these dates', 'Warning!');
    }
  }
  getCurrentCustomerFindexPoint() {
    this.customerService
      .getCustomerByEmail(this.localStorageService.get('currentCustomerEmail'))
      .subscribe((response) => {
        this.currentCustomer = response.data;
      });
  }
}
