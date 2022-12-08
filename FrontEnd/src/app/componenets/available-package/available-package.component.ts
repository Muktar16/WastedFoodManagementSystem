import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { RequestService } from 'src/app/services/food-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-available-package',
  templateUrl: './available-package.component.html',
  styleUrls: ['./available-package.component.css']
})
export class AvailablePackageComponent implements OnInit {

  constructor(private foodService:RequestService,private router:Router,private adminService:AdminService) { }
  //data objects
  availablePackages:any;
  ids = {
    requestId:'',
    packageId:''
  }

  ngOnInit(): void {
    this.getAvailablePackages();
  }
  backButton(){
    this.router.navigateByUrl('/ngo-home');
  }
  
  getAvailablePackages(){
    this.foodService.getAvailablePackages().subscribe(
      (res:any) => {
        this.availablePackages = res;
        //console.log(this.availablePackages);
      },
      (err:any) => {
        alert(err.error.message);
      }
    );
  }

  //notify restaurant for the request
  sendRequest(Package:any){
    this.ids.packageId = Package.packageId;
    this.ids.requestId = this.foodService.getRecentRequest().requestId;
    
    this.foodService.sendRequestNotice(this.ids).subscribe(
      (res:any) => {
        Swal.fire("Succeed","Your Request Has been sent. You will be notified after Restaurant Confirmation","success").then(result=>{
          this.router.navigateByUrl('/ngo-home');
        })
      },
      (err:any) => {
        Swal.fire("Error",err.error.message,"error");
      }
    );
  }

}
