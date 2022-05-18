import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit
{
  regForm!:FormGroup
  regUser:any
  regAPIUrl : string = "https://ty-shoping-cart.herokuapp.com/api-docs/"


  constructor(private fb:FormBuilder, private router:Router, private api:ApiServiceService) { }
  isloading:any
  ngOnInit(): void {
    this.isloading=false
    this.regForm=this.fb.group({
      email:this.fb.control('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password:this.fb.control('',[ Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),

      role: new FormControl("Client")
   })
  }

  get email()
  {
    return this.regForm.get('email')
  }
  get password()
  {
    return this.regForm.get('password')
  }

  Reg()
  {
    this.isloading=false

    console.log(this.regForm.value);
    this.api.registerUser(this.regForm.value).subscribe((res)=>{
      console.log(res,'res');
      window.alert("Registered Sucessfully")
    this.isloading=false
    })

  }

}
