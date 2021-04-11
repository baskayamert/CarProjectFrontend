import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
   {path:"", pathMatch:"full", component: CarComponent},
   {path:"cars", component: CarComponent},
   {path:"cars/add", component: CarAddComponent, canActivate:[LoginGuard]},
   {path:"cars/update/:carId", component: CarUpdateComponent, canActivate:[LoginGuard]},
   {path:"brands/add", component: BrandAddComponent, canActivate:[LoginGuard]},
   {path:"brands/update", component: BrandUpdateComponent, canActivate:[LoginGuard]},
   {path:"colors/add", component: ColorAddComponent, canActivate:[LoginGuard]},
   {path:"colors/update", component: ColorUpdateComponent, canActivate:[LoginGuard]},
   {path:"cars/brand/:brandId", component: CarComponent},
   {path:"cars/color/:colorId", component: CarComponent},
   {path:"cars/:carId", component: CarDetailComponent},
   {path:"cars/:carId/payment", component: PaymentComponent},
   {path:"register", component: RegisterComponent},
   {path:"login", component: LoginComponent},
   {path:"profile", component: ProfileComponent},
   {path:"editProfile", component: EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
