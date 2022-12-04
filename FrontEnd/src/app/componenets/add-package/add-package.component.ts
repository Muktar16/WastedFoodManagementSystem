import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {

  constructor(private userService:UserService) { }
  foodItems:any;
  foodPackage : FormGroup=new FormGroup({
    foodName:new FormControl(null,[Validators.required]),
    amount:new FormControl(null,[Validators.email,Validators.required]),
    expiryDate:new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    this.getFoodItems();
  }
  getFoodItems(){
    this.userService.getFoodItems().subscribe(
      (res:any) => {
        this.foodItems = res;
        console.log(this.foodItems);
      },
      (err:any) => {
        alert(err.error.message);
        //this.serverErrorMessages = err.error.message;
      }
    );
  }

}
