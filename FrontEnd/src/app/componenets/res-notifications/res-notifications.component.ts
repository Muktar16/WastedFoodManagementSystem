import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/food-request.service';

@Component({
  selector: 'app-res-notifications',
  templateUrl: './res-notifications.component.html',
  styleUrls: ['./res-notifications.component.css']
})
export class ResNotificationsComponent implements OnInit {

  constructor(private foodService:RequestService) { 
    this.mySub = interval(3000).subscribe((func => {
      this.getAllNotifications();
    }))
  }

  //data Objects
  mySub: Subscription | undefined;
  notifications:any;

  ngOnInit(): void {
    this.getAllNotifications();
  }
  getAllNotifications(){
    // this.foodService.getResNotifications(currentRestaurant).subscribe(
    //   (res:any) => {
    //     this.notifications = res;
    //     //console.log(this.foodItems);
    //   },
    //   (err:any) => {
    //     alert(err.error.message);
    //     //this.serverErrorMessages = err.error.message;
    //   }
    // );
  }
  confirm(notificaiton:any){

  }
  cancel(notificaiton:any){

  }

}
