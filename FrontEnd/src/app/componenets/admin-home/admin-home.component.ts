import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { OtherService } from 'src/app/services/other.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router:Router,private userService:UserService,private adminService:AdminService,private otherService:OtherService) { }
  //data objects
  mainContent='activities';
  ngoLists:any;
  restaurantLists:any;
  foodItems:any;
  addFoodForm = false;
  FoodItem : FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required]),
    addingDate:new FormControl(null,[Validators.email,Validators.required])
  });

  //methods
  ngOnInit(): void {
  }

  logOut(){
    this.otherService.deleteToken();
    this.router.navigate(['/admin']);
  }

  ngoList(){
    this.getNgoList();
    this.mainContent = "ngoList";
  }
  restaurantList(){
    this.getRestaurantList();
    this.mainContent = "restaurantList";
  }

  itemList(){
    this.addFoodForm = false;
    this.getFoodItems();
    this.mainContent = "itemList";
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

  getRestaurantList(){
    this.adminService.getRestaurants().subscribe(
      (res:any) => {
        this.restaurantLists = res;
        console.log(this.restaurantLists);
      },
      (err:any) => {
        alert(err.error.message);
        //this.serverErrorMessages = err.error.message;
      }
    );
  }

  removeNgo(ngo:any){
    this.adminService.removeNgo(ngo).subscribe(
      (res:any)=>{
        console.log(res);
        this.getNgoList();
      },
      (err:any)=>{
        alert(err.error.message);
      }
    )
  }

  removeRestaurant(restaurant:any){
    this.adminService.removeRestaurant(restaurant).subscribe(
      (res:any)=>{
        console.log(res);
        this.getRestaurantList();
      },
      (err:any)=>{
        alert(err.error.message);
      }
    )
  }

  getNgoList(){
    this.adminService.getNgos().subscribe(
      (res:any) => {
        this.ngoLists = res;
        console.log(this.ngoLists);
      },
      (err:any) => {
        alert(err.error.message);
        //this.serverErrorMessages = err.error.message;
      }
    );
  }

  activateAddFoodForm(){
    this.addFoodForm = true;
  }

  addNewFood(){
    this.userService.addNewFood(this.FoodItem.value).subscribe(
      (res:any) => {
        console.log("Success");
        this.addFoodForm = false;
        this.getFoodItems();
      },
      (err:any) => {
        alert(err.error.message);
        //this.serverErrorMessages = err.error.message;
      }
    ); 
  }

  removeFood(food:any){
    this.adminService.removeFood(food).subscribe(
      (res:any)=>{
        console.log(res);
        this.getFoodItems();
      },
      (err:any)=>{
        alert(err.error.message);
      }
    )
  }
}
