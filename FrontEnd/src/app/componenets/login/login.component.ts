import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private _router:Router) { }

  serverErrorMessages: string = 'false';

  loginForm : FormGroup=new FormGroup({
    userType:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
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
          this.userService.setToken(res['token']);
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
