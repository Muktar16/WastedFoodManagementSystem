import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ngo-reg',
  templateUrl: './ngo-reg.component.html',
  styleUrls: ['./ngo-reg.component.css']
})
export class NgoRegComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private router:Router,private userService:UserService) { }

  showSucessMessage: boolean = false;
  serverErrorMessages: string = 'false';

  ngo_registerForm = this.formBuilder.group({
    ngoName: new FormControl(null,[Validators.required]),
    ngoEmail:new FormControl(null,[Validators.email,Validators.required]),
    phone:new FormControl(null,[Validators.required]),
    registrationNo:new FormControl(null,[Validators.required]),
    address:new FormControl(null,[Validators.required]),
    password:new FormControl(null,Validators.required),
    cpassword:new FormControl(null,Validators.required)
  })

  ngOnInit(): void {
  }
  ngo_register(){
    if((this.ngo_registerForm.get('password')?.value != this.ngo_registerForm.get('cpassword')?.value)){
      this.serverErrorMessages = "Password Mismatched!!!!";
      return;
    }

    this.serverErrorMessages='false';
    this.userService.saveNgoUser(this.ngo_registerForm.value).subscribe(
      res => {
        //alert("Registration Successfully");
        this.showSucessMessage = true;
        // setTimeout(() => {this.showSucessMessage = false; this.router.navigate(['/login'])}, 3000);
        // this.ngo_registerForm.reset();
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
    this.router.navigateByUrl("login");
  }

}
