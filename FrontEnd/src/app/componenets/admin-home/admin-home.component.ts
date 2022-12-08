import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { RequestService } from 'src/app/services/food-request.service';
import { OtherService } from 'src/app/services/other.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router:Router,private userService:UserService,
    private adminService:AdminService,private otherService:OtherService,private foodService:RequestService) { }
  //data objects
  serverErrorMessages = 'false';
  showSucessMessage = false;
  mainContent='allRequests';
  ngoLists:any;
  restaurantLists:any;
  foodItems:any;
  activities:any;
  addFoodForm = false;
  allPendingRequests:any;
  allPendingPackages:any;
  FoodItem : FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required]),
    addingDate:new FormControl(null,[Validators.email,Validators.required])
  });

  //methods
  ngOnInit(): void {
    this.getActivities();
    this.showPendingRequests();
  }
  getActivities(){
    this.adminService.getAllActivities().subscribe(
      (res:any) => {
        this.activities = res;
        console.log(this.activities);
      },
      (err:any) => {
        //Swal.fire("Error",err.error.message,"error");
      }
    );
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
        Swal.fire("Error",err.error.message,"error");
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
        Swal.fire("Error",err.error.message,"error");
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
        Swal.fire("Error",err.error.message,"error");
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
        Swal.fire("Error",err.error.message,"error");
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

        Swal.fire("Succeed","Successfully Added food to the System","success").then(result=>{
          this.addFoodForm = false;
          this.getFoodItems();
          //window.location.reload();
        })
      },
      (err:any) => {
        this.serverErrorMessages = err.error.message;
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
        Swal.fire("Error",err.error.message,"error");
      }
    )
  }

  showPendingRequests(){
    this.foodService.getAllPendingRequests().subscribe(
      (res:any) => {
        this.allPendingRequests = res;
        console.log(this.allPendingRequests);
        this.mainContent = 'allRequests'
      },
      (err:any) => {
        Swal.fire("Error",err.error.message,"error");
        //this.serverErrorMessages = err.error.message;
      }
    );
  }

  refresh(){
    this.mainContent = "activities";
  }

  deleteRequest(request:any){
    if(window.confirm("Are you sure to delete ")) {
      console.log("Implement delete functionality here");
    }
  }

  showAvailablePackages(){
    this.foodService.getAllAvailablePackages().subscribe(
      (res:any) => {
        this.allPendingPackages = res;
        console.log(this.allPendingPackages);
        this.mainContent = 'allPackages'
      },
      (err:any) => {
        Swal.fire("Error",err.error.message,"error");
      }
    );
  }

  deletePackage(Package:any){
    if(confirm("Are you sure to delete ")) {
      console.log("Implement delete functionality here");
    }
  }
}
