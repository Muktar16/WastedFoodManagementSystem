import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtherService } from 'src/app/services/other.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {

  constructor(private userService:UserService,private router:Router, private otherService:OtherService) { }

  serverErrorMessages = 'false';
  currentContent = 'activities';
  currentRestaurant = {
    name:'',
    email:''
  }

  ngOnInit(): void {
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

  pendingRequestList(){
    this.currentContent = "pendingRequests";
  }

  foodPackageForm(){
    this.currentContent="foodPackageForm";
  }

  logout(){
    this.otherService.deleteToken();
    this.router.navigate(['/login']);
  }

}
