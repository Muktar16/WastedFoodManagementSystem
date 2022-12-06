import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { RequestService } from 'src/app/services/food-request.service';
import { OtherService } from 'src/app/services/other.service';
import { UserService } from 'src/app/services/user.service';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-ngo-home',
  templateUrl: './ngo-home.component.html',
  styleUrls: ['./ngo-home.component.css']
})
export class NgoHomeComponent implements OnInit {

  constructor(private userService:UserService,private router:Router,
    private requestService:RequestService,private otherService:OtherService) { 

      this.mySub = interval(3000).subscribe((func => {
        this.getCurrentRequests();
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
            this.serverErrorMessages = err.error.message;
          else this.serverErrorMessages = "Oops!! Server Connection Failed....";
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
        alert(err.error.message);
        //this.serverErrorMessages = err.error.message;
      }
    );
  }
  updateRequest(requestToBeUpdated:any){
    this.getFoodItems();
    this.currentContent = "updateForm";
    this.requestedTobeUpdated = requestToBeUpdated;
  }

  deleteRequest(request:any){
    if(window.confirm("The Request will Be deleted permanantly.?")){
      this.requestService.removeRequest(request).subscribe(
        (res:any)=>{
          console.log(res);
          this.getCurrentRequests();
        },
        (err:any)=>{
          alert(err.error.message);
        }
      )
    }
  }

  // continue(){
  //   this.currentContent = "activities";
  //   this.ngOnInit();
  // }

}
