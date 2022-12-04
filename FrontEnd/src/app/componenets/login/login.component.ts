import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OtherService } from 'src/app/services/other.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private _router:Router,private otherService:OtherService) { }

  serverErrorMessages: string = 'false';
  currentUser = {
    name:'',
    email:'',
    userType:''
  }
  loginForm : FormGroup=new FormGroup({
    userType:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    if(this.otherService.isLoggedIn()){
      this.getUser();
    }
  }

  forgotPassword(){
    this._router.navigateByUrl('/forgot-password');
  }

  getUser(){
    this.userService.getUser().subscribe(
      (res:any) => {
        this.currentUser.name = res['user'].ngoName;
        this.currentUser.email = res['user'].ngoEmail;
        this.currentUser.userType = res['userType'];
        if(this.currentUser.userType=='Ngo Representative'){
          this._router.navigate(['/ngo-home'])
        }
        else if(this.currentUser.userType=='Restaurant Representative'){
          this._router.navigate(['/restaurant-home']);
        }
        else this._router.navigate(['/admin-home']);
      },
      err => { 
        this.serverErrorMessages = err.error.message;
        this._router.navigate(['/admin-home']);
        //alert(this.serverErrorMessages);
      }
    );
  }

  login(){
    this.userService.login(this.loginForm.value).subscribe(
      (res:any) => {
        //console.log(res);
        if(res['status']=='false') {
          this.serverErrorMessages = res['message'];
          //alert(this.serverErrorMessages);
        }
        else{
          this.otherService.setToken(res['token']);
          if(res['userType']=='NGO Representative'){
            this._router.navigateByUrl('/ngo-home');
          }
          else if(res['userType']=='Restaurant Representative'){
            this._router.navigateByUrl('/restaurant-home');
          }
             
        } 
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
