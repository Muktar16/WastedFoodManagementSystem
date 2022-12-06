import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/food-request.service';
import { OtherService } from 'src/app/services/other.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {

  constructor(private userService:UserService,private router:Router,private foodService:RequestService, private otherService:OtherService) { }

  //data Objects
  serverErrorMessages = 'false';
  currentContent = 'activities';
  foodItems:any;
  currrentPackages:any;
  currentRestaurant = {
    name:'',
    email:''
  }
  foodPackage : FormGroup=new FormGroup({
    foodName:new FormControl(null,[Validators.required]),
    quantity:new FormControl(null,[Validators.required]),
    expiryDate:new FormControl(null,[Validators.required]),
  });

  //methods
  ngOnInit(): void {
    this.getUser();
    this.getCurrentPackages();
  }

  getCurrentPackages(){
    this.foodService.getCurrentPackages(this.currentRestaurant).subscribe(
      (res:any) => {
        this.currrentPackages = res;
        console.log(this.currrentPackages);
      },
      (err:any) => {
        alert(err.error.message);
        //this.serverErrorMessages = err.error.message;
      }
    );
  }

  getUser(){
    this.userService.getUser().subscribe(
      (res:any) => {
        this.currentRestaurant.name = res['user'].name;
        this.currentRestaurant.email = res['user'].email;
      },
      err => { 
        this.serverErrorMessages = err.error.message;
        alert(this.serverErrorMessages);
      }
    );
  }

  addFoodPackageButton(){
    this.getFoodItems();
    this.currentContent = "addFoodPackageForm"
  }
  addFoodPackage(){
    if(this.foodPackage.get('foodName')?.value=="Select food"){
      this.serverErrorMessages = "Please Select a food";
    }

    else{
      this.foodService.addFoodPackage(this.foodPackage.value,this.currentRestaurant).subscribe(
        (res:any)=>{
          console.log(res);
          this.currentContent = 'successMessage';
        },
        (err:any)=>{
          if(err.status == 422)
            this.serverErrorMessages = err.error.message;
          else this.serverErrorMessages = "Oops!! Server Connection Failed....";
          //alert(err.errror.message);
        }
      )
    }
  }

  pendingRequestList(){
    this.currentContent = "pendingRequests";
  }

  foodPackageForm(){
    this.currentContent="foodPackageForm";
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

  logout(){
    this.otherService.deleteToken();
    this.router.navigate(['/login']);
  }
  continue(){
    this.currentContent = "activities";
    this.ngOnInit();
  }

}
