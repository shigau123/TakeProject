import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private http:HttpClient, private cart:CartserviceService) { }
payment=new FormGroup({
  cardName:new FormControl('',[Validators.required]),
  cvv:new FormControl('',[Validators.required])
})

get cardName(){
  return this.payment.get('cardName')
}
get cvv(){
  return this.payment.get('cvv')
}
paymentdone(){
   console.log(this.payment.value);
   this.cart.paymentmethod(this.payment.value).subscribe((sub)=>{
      console.log(sub);
      
   })
}
  ngOnInit(): void {
    
  }
  

}
