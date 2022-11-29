import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService,private router:Router) { }

  serverErrorMessages: string = 'false';

  adminLoginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });

  adminLogin(){
    this.userService.adminLogin(this.adminLoginForm.value).subscribe(
      (res:any) => {
        //console.log(res);
        if(res['status']=='false') {
          this.serverErrorMessages = res['message'];
          //alert(this.serverErrorMessages);
        }
        else{
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/admin-home');   
        } 
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  ngOnInit(): void {
  }

}
