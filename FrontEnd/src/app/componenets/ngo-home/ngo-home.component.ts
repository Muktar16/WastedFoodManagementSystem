import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/food-request.service';
import { OtherService } from 'src/app/services/other.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ngo-home',
  templateUrl: './ngo-home.component.html',
  styleUrls: ['./ngo-home.component.css']
})
export class NgoHomeComponent implements OnInit {

  constructor(private userService:UserService,private router:Router,
    private requestService:RequestService,private otherService:OtherService) { }

  //data Objects
  serverErrorMessages: string = 'false';
  showSucessMessage = false;
  foodItems:any;
  requests:any;
  
  currentContent = 'activities';
  currentNgo = {
    name:'',
    email:''
  }

  foodRequest : FormGroup=new FormGroup({
    foodName:new FormControl(null,[Validators.required]),
    amount:new FormControl(null,[Validators.required]),
    deliveryAddress:new FormControl(null,[Validators.required]),
    supplyDate:new FormControl(null,[Validators.required]),
  });

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getUser().subscribe(
      (res:any) => {
        this.currentNgo.name = res['user'].ngoName;
        this.currentNgo.email = res['user'].ngoEmail;
      },
      err => { 
        this.serverErrorMessages = err.error.message;
        alert(this.serverErrorMessages);
      }
    );
  }

  logout(){
    this.otherService.deleteToken();
    this.router.navigate(['/login']);
  }

  addRequest(){
    this.getFoodItems();
    this.currentContent='addRequest';
  }

  addFoodRequest(){
    this.requestService.addFoodRequest(this.foodRequest.value).subscribe(
      (res:any)=>{
        console.log(res);
        this.currentContent = 'successMessage';
      },
      (err:any)=>{
        alert(err.errror.message);
      }
    )
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
