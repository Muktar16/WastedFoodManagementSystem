import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { OtherService } from 'src/app/services/other.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private userService: UserService,
    private router:Router,private adminService:AdminService,private otherService:OtherService) { }

  //data objects
  serverErrorMessages: string = 'false';
  currentUser = {
    name:'',
    email:'',
    userType:''
  }
  adminLoginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });

  //methods
  adminLogin(){
    this.adminService.adminLogin(this.adminLoginForm.value).subscribe(
      (res:any) => {
        if(res['status']=='false') {
          this.serverErrorMessages = res['message'];
        }
        else{
          this.otherService.setToken(res['token']);
          this.router.navigateByUrl('/admin-home');   
        } 
      },
      err => {
        if(err.status==422){
          this.serverErrorMessages = err.error.message;
        }
        else{
          this.serverErrorMessages = 'Opps!! Server not Responding. Please contact admin.';
        }
      }
    );
  }

  ngOnInit(): void {
    if(this.otherService.isLoggedIn()){
      this.getUser();
    }
  }
  getUser(){
    this.userService.getUser().subscribe(
      (res:any) => {
        this.currentUser.name = res['user'].ngoName;
        this.currentUser.email = res['user'].ngoEmail;
        this.currentUser.userType = res['userType'];
        if(this.currentUser.userType=='Ngo Representative'){
          this.router.navigate(['/ngo-home'])
        }
        else if(this.currentUser.userType=='Restaurant Representative'){
          this.router.navigate(['/restaurant-home']);
        }
        else this.router.navigate(['/admin-home']);
      },
      err => { 
        this.serverErrorMessages = err.error.message;
        this.router.navigate(['/admin-home']);
        //alert(this.serverErrorMessages);
      }
    );
  }

}
