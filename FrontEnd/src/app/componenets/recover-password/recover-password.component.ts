import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  constructor(private userService:UserService) { }

  serverErrorMessages: string = 'false';
  recoveryData : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required])
  });

  ngOnInit(): void {
  }

  sendRecoveryEmail(){
    this.userService.sendRecoveryEmail(this.recoveryData.value).subscribe(
      (res:any) => {
        console.log(res);
        
      },
      err => {
        this.serverErrorMessages = err.error.message;
        console.log("Server Error");
      }
    );
  }
}
