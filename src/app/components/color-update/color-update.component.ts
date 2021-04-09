import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private toastrService:ToastrService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:["",Validators.required],
      name:["",Validators.required]
    })
  }
  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({},this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(response=>{
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
