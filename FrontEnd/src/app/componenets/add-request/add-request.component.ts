import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

  constructor() { }

  foodRequest : FormGroup=new FormGroup({
    foodItem:new FormControl(null,[Validators.required]),
    amount:new FormControl(null,[Validators.required])
  });


  ngOnInit(): void {

  }

}
