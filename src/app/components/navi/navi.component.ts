import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerDto } from 'src/app/models/customerDto';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  currentCustomer : CustomerDto; 
  currentRole:Role;

  constructor(private localStorageService:LocalStorageService, 
    private customerService:CustomerService, 
    private authService:AuthService,
    private toastrService:ToastrService,
    private roleService:RoleService) { }

  ngOnInit(): void {
    if(this.isAuthenticated){
      this.getCurrentCustomer();
    }
    
  }

  getCurrentCustomer(){
    this.customerService.getCustomerByEmail(this.localStorageService.get("currentCustomerEmail")).subscribe(response=>{
      this.currentCustomer = response.data;
      console.log(this.currentCustomer)
      this.getUserRole();
    });
  }
  deleteLocalStorage(){
    this.toastrService.info("You logged out","For your information!")
    this.localStorageService.clear();

  
  }
  isAuthenticated():boolean{
    return this.authService.isAuthenticated();
  }
  getUserRole(){
    this.roleService.getRoleByUserId(this.currentCustomer.userId).subscribe(response=>{
      this.currentRole = response.data;
      console.log(this.currentCustomer)
      this.localStorageService.add("role",response.data.roleName);
    })
  }
  checkAuth():boolean{
    if(this.currentRole.roleName == "admin"){
      return true;
    } 
    else return false;
  }
}
