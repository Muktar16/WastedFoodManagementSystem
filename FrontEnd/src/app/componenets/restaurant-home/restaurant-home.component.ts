import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { text } from 'body-parser';
import { interval, Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/food-request.service';
import { OtherService } from 'src/app/services/other.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {

  constructor(private userService:UserService,private router:Router,
    private foodService:RequestService, private otherService:OtherService) {
      this.mySub = interval(10000).subscribe((func => {
        this.getAllNotifications();
      }))
    }

  //data Objects
  mySub: Subscription | undefined;
  serverErrorMessages = 'false';
  currentContent = 'activities';
  foodItems:any;
  currrentPackages:any;
  notifications:any;
  packageToBeUpdated:any;
  currentRestaurant = {
    name:'',
    email:''
  }
  foodPackage : FormGroup=new FormGroup({
    foodName:new FormControl(null,[Validators.required]),
    quantity:new FormControl(null,[Validators.required]),
    expiryDate:new FormControl(null,[Validators.required]),
  });
  updatedPackage : FormGroup=new FormGroup({
    foodName:new FormControl(null,[Validators.required]),
    quantity:new FormControl(null,[Validators.required]),
    expiryDate:new FormControl(null,[Validators.required]),
  });
  //methods
  ngOnInit(): void {
    this.getUser();
  }

  getCurrentPackages(){
    this.foodService.getCurrentPackages(this.currentRestaurant).subscribe(
      (res:any) => {
        this.currrentPackages = res;
        //console.log(this.currrentPackages);
      },
      (err:any) => {
        Swal.fire("Server Error","Probleb getting Current Activities. Pleaser Reload the page","error");
      }
    );
  }

  getAllNotifications(){
    this.foodService.getResNotifications(this.currentRestaurant).subscribe(
      (res:any) => {
        if(!this.notifications && !this.currrentPackages){
          this.mySub?.unsubscribe();
        }
        this.notifications = res;
        console.log("hiiii")
        console.log(this.notifications);
        //this.currentContent = "notifications"
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
        this.getCurrentPackages();
        this.getFoodItems();
      },
      err => { 
        this.serverErrorMessages = err.error.message;
        alert(this.serverErrorMessages);
      }
    );
  }

  showNotificaitons(){
    this.getAllNotifications();
    this.currentContent = "notifications"
  }

  addFoodPackageButton(){
    this.currentContent = "addFoodPackageForm";
  }

  addFoodPackage(){
    if(this.foodPackage.get('foodName')?.value=="Select food"){
      this.serverErrorMessages = "Please Select a food";
    }

    else{
      this.foodService.addFoodPackage(this.foodPackage.value,this.currentRestaurant).subscribe(
        (res:any)=>{
          Swal.fire("Succeed","Your Food Package Successfully to the System","success").then(result=>{
            window.location.reload();
          })
        },
        (err:any)=>{
          if(err.status == 422)
            Swal.fire("Error",err.error.message,"error");
          else Swal.fire("Connecton Error", "Server Not Responding. Please Contact Admin","error");
        }
      )
    }
  }

  pendingRequestList(){
    this.getAllRequests();
  }

  allPendingRequests:any;
  getAllRequests(){
    this.foodService.getAllPendingRequests().subscribe(
      (res:any) => {
        console.log("Success");
        this.allPendingRequests = res;
        this.currentContent = "pendingRequests";
      },
      (err:any) => {
        Swal.fire("Error",err.error.message,"error");
      }
    );
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
        Swal.fire("Error",err.error.message,"error");
        //this.serverErrorMessages = err.error.message;
      }
    );
  }

  logout(){
    this.mySub?.unsubscribe();
    this.currentRestaurant.email='';
    this.currentRestaurant.name='';
    this.otherService.deleteToken();
    this.router.navigate(['/login']);
  }

  continue(){
    this.currentContent = "activities";
    this.ngOnInit();
  }
  ids = {
    requestId:'',
    packageId:''
  }
  confirm(notification:any){
    this.ids.packageId = notification.packageId;
    this.ids.requestId = notification.requestId;
    this.foodService.confirmRequest(this.ids).subscribe(
      (res:any) => {
        Swal.fire("Succeed","Your Confirmation message Has been sent successfully","success").then(result=>{
          window.location.reload();
        })
      },
      (err:any) => {
        Swal.fire("Error",err.error.message,"error");
      }
    );
  }
  cancel(notification:any){

  }
  updatePackage(Package:any){
    this.packageToBeUpdated = Package;
    this.currentContent = 'updateForm';
  }

  updateFoodPackage(){

    this.packageToBeUpdated.foodName = this.updatedPackage.get("foodName")?.value;
    this.packageToBeUpdated.quantity = this.updatedPackage.get("quantity")?.value;
    this.packageToBeUpdated.expiryDate = this.updatedPackage.get("expiryDate")?.value;
    console.log(this.packageToBeUpdated);
    this.foodService.updatePackage(this.packageToBeUpdated).subscribe(
      res=>{
        console.log("HI")
          Swal.fire("Succeed","Package updated Successfully","success").then(result=>{
            window.location.reload();
          });
    },
    err=>{
      Swal.fire("Error",err.error.message,"error").then(result=>{
        window.location.reload();
      });;
    })
  }
  
  deletePackage(Package:any){
    if(Package.status=="Shipping"){
      Swal.fire("Warning",)
    }
    else{
      Swal.fire({title: 'Are you sure?',text: "You won't be able to revert this!",
        icon: 'warning',showCancelButton: true,confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',confirmButtonText: 'Yes, delete it!'}).then((result) => {
        if (result.isConfirmed) {
          this.foodService.removePackage(Package).subscribe(
            (res:any) =>{
              if(res){
                Swal.fire('Deleted!','Your food Package has been deleted.','success').then(result=>{
                  window.location.reload();
                });
                
              }    
            },
            (err:any)=>{
              Swal.fire('Error Deleting',err.error.message,'error');
            }
            
          )
        }
      })
      
    }
  }

  notifyNGO(request:any){
    Swal.fire("Succeed","Notification Sent to the NGO","success").then(result=>{
      window.location.reload();
    });
  }

}

