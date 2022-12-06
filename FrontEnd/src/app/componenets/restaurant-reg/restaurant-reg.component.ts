import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
      Swal.fire("Password Mismatched!!","You Must provide same Password in Password and Confirm Password Field","error");
      return;
    }
    
    this.serverErrorMessages='false';
    this.userService.saveRestUser(this.restaurant_registerForm.value).subscribe(
      res => {
        Swal.fire("Succeed","Your Registration Completed Successfully. You can Login Now.","success");
        this.router.navigateByUrl('/login');
      },
      err => {
        if (err.status === 422) {
          Swal.fire("Error",err.error.join('<br>'),"error");
        }
        else
        Swal.fire("Server Connection Error","Server Not Responding. Please contact Admin","error");
      }
    )

  }

  gotoLogInpage(){
    this.router.navigateByUrl("login")
  }
}
