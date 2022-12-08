import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { RequestService } from 'src/app/services/food-request.service';
import { OtherService } from 'src/app/services/other.service';
import { UserService } from 'src/app/services/user.service';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ngo-home',
  templateUrl: './ngo-home.component.html',
  styleUrls: ['./ngo-home.component.css']
})
export class NgoHomeComponent implements OnInit {

  constructor(private userService:UserService,private router:Router,
    private requestService:RequestService,private otherService:OtherService) { 

      this.mySub = interval(3000).subscribe((func => {
        //this.getAllNotifications();
      }))
    }

  //data Objects
  mySub: Subscription | undefined;
  stop = false;
  serverErrorMessages: string = 'false';
  showSucessMessage = false;
  foodItems:any;
  requests:any;
  currentContent = 'activities';
  intervalId:any;
  currentNgo = {
    name:'',
    email:''
  }
  requestedTobeUpdated:any;
  foodRequest : FormGroup=new FormGroup({
    foodName:new FormControl(null,[Validators.required]),
    quantity:new FormControl(null,[Validators.required]),
    deliveryAddress:new FormControl(null,[Validators.required]),
    supplyDate:new FormControl(null,[Validators.required]),
  });
  updateForm : FormGroup=new FormGroup({
    foodName:new FormControl(null,[Validators.required]),
    quantity:new FormControl(null,[Validators.required]),
    deliveryAddress:new FormControl(null,[Validators.required]),
    supplyDate:new FormControl(null,[Validators.required]),
  });

  confirm(notification:any){
    this.requestService.changeRequestStatus(notification).subscribe(
      (res:any) => {
       
       Swal.fire("Succeed","Successfull","success").then(result=>{
        window.location.reload();
       })
      },
      (err:any) => {
        alert(err.error.message);
        //this.serverErrorMessages = err.error.message;
      }
    );
  }

  showNotificaitons(){
    this.getAllNotifications();
  }


  notifications:any;
  getAllNotifications(){
    this.requestService.getNgoNotifications(this.currentNgo).subscribe(
      (res:any) => {
        if(!this.notifications){
          this.mySub?.unsubscribe();
        }
        this.notifications = res;
        this.currentContent = "notifications"
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


  ngOnInit(): void {
    this.getUser();
  }


  getCurrentRequests(){
    this.requestService.getCurrentRequests(this.currentNgo).subscribe(
      (res:any) => {
        this.requests = res;
        if(!this.requests){
          this.mySub?.unsubscribe();
        }
        console.log(this.requests);
      },
      (err:any) => {
        if(!this.requests){
          this.mySub?.unsubscribe();
        }
        alert(err.error.message);
        //this.serverErrorMessages = err.error.message;
      }
    );
  }

  getUser(){
    this.userService.getUser().subscribe(
      (res:any) => {
        this.currentNgo.name = res['user'].ngoName;
        this.currentNgo.email = res['user'].ngoEmail;
        this.getCurrentRequests();
      },
      err => { 
        this.serverErrorMessages = err.error.message;
        alert(this.serverErrorMessages);
      }
    );
  }

  logout(){
    this.mySub?.unsubscribe();
    this.currentNgo.email='';
    this.currentNgo.name='';
    this.otherService.deleteToken();
    this.router.navigate(['/login']);
  }

  addRequest(){
    this.getFoodItems();
    this.currentContent='addRequest';
  }

  //add a new food request to database
  addFoodRequest(){
    if(this.foodRequest.get('foodName')?.value=="Select food"){
      this.serverErrorMessages = "Please Select a food";
    }
    else{
      this.requestService.addFoodRequest(this.foodRequest.value,this.currentNgo).subscribe(
        (res:any)=>{
          console.log(res);
          //this.currentContent = 'successMessage';
          this.requestService.setRecentRequest(res);
          this.mySub?.unsubscribe();
          this.router.navigateByUrl('/available-package')
          console.log(this.requestService.getRecentRequest());
        },
        (err:any)=>{
          if(err.status == 422)
            Swal.fire("Error",err.error.message);
            //this.serverErrorMessages = err.error.message;
          else 
            Swal.fire("Error","Oops!! Server Connection Failed....","error");
          //this.serverErrorMessages = "Oops!! Server Connection Failed....";
          //alert(err.errror.message);
        }
      )
    }
  }

  getFoodItems(){
    this.userService.getFoodItems().subscribe(
      (res:any) => {
        this.foodItems = res;
        console.log(this.foodItems);
      },
      (err:any) => {
        //alert(err.error.message);
        //this.serverErrorMessages = err.error.message;
      }
    );
  }

  updateRequest(requestToBeUpdated:any){
    this.getFoodItems();
    this.currentContent = "updateForm";
    this.requestedTobeUpdated = requestToBeUpdated;
  }

  getAvailablePacakges(){
    this.requestService.getAllPendingRequests().subscribe(
      (res:any) => {
        this.requests = res;
        console.log(this.requests);
        this.currentContent = 'allRequests'
      },
      (err:any) => {
        Swal.fire("Error",err.error.message,"error");
        //this.serverErrorMessages = err.error.message;
      }
    );
  }
  ids = {
    requestId:'',
    packageId:''
  }
  sendRequest(Package:any){
    this.ids.packageId = Package.packageId;
    this.ids.requestId = this.requestService.getRecentRequest().requestId;
    this.requestService.sendRequestNotice(this.ids).subscribe(
      (res:any) => {
        alert("Your Request Has been sent. You will be notified after Restaurant Confirmation");
        console.log(res);
        this.router.navigateByUrl('/ngo-home');
      },
      (err:any) => {
        alert(err.error.message);
        //this.serverErrorMessages = err.error.message;
      }
    );
  
  }

 

  updateFoodRequest(){
    this.requestedTobeUpdated.foodName = this.updateForm.get("foodName")?.value;
    this.requestedTobeUpdated.quantity = this.updateForm.get("quantity")?.value;
    this.requestedTobeUpdated.expiryDate = this.updateForm.get("expiryDate")?.value;
    console.log(this.requestedTobeUpdated);

    this.requestService.updateRequest(this.requestedTobeUpdated).subscribe(
      res=>{
        console.log("HI")
          Swal.fire("Succeed","Request updated Successfully","success").then(result=>{
            window.location.reload();
          });
    },
    err=>{
      Swal.fire("Error",err.error.message,"error").then(result=>{
        window.location.reload();
      });;
    })
  }

  deleteRequest(request:any){
    Swal.fire({title: 'Are you sure?',text: "You won't be able to revert this!",
        icon: 'warning',showCancelButton: true,confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',confirmButtonText: 'Yes, delete it!'}).then((result) => {
        if (result.isConfirmed) {
          this.requestService.removeRequest(request).subscribe(
            (res:any) =>{
              if(res){
                Swal.fire('Deleted!','Your food Request has been deleted.','success').then(result=>{
                  this.getCurrentRequests();
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
