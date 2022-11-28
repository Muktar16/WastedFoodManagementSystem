import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restaurant-reg',
  templateUrl: './restaurant-reg.component.html',
  styleUrls: ['./restaurant-reg.component.css']
})
export class RestaurantRegComponent implements OnInit {

  constructor(private router:Router,private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
  }

  showSucessMessage = false;
  serverErrorMessages = 'false';

  restaurant_registerForm = this.formBuilder.group({
    name: new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    phone:new FormControl(null,[Validators.required]),
    address:new FormControl(null,[Validators.required]),
    password:new FormControl(null,Validators.required),
    cpassword:new FormControl(null,Validators.required)
  })

  restaurant_register(){
    if((this.restaurant_registerForm.get('password')?.value != this.restaurant_registerForm.get('cpassword')?.value)){
      this.serverErrorMessages = "Password Mismatched!!!!";
      return;
    }
    
    this.serverErrorMessages='false';
    this.userService.saveRestUser(this.restaurant_registerForm.value).subscribe(
      res => {
        //alert("Registration Successfully");
        this.showSucessMessage = true;
        // setTimeout(() => {this.showSucessMessage = false; this.router.navigate(['/login'])}, 3000);
        // this.restaurant_registerForm.reset();
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join(',  ');
          //alert(this.serverErrorMessages);
        }
        else
          this.serverErrorMessages = 'Opps!! Server not Responding. Please contact admin.';
          //alert(this.serverErrorMessages);
      }
    )

  }

  gotoLogInpage(){
    this.router.navigateByUrl("login")
  }
}
