import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { CartserviceService } from '../cartservice.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dialog: any;
  

  constructor(private api:ApiServiceService, private cart:CartserviceService) { }
addcartid:any
totalnumber:number=0
  ngOnInit(): void {
    this.cart.getProduct().subscribe((res)=>{
     this.totalnumber=res.length; 
    })
    this.getProducts()
  }
  products:any;
getProducts(){
  this.api.getProducts().subscribe((res)=>{
    this.products = res.response
  })
}
addcart(product:any){
 this.cart.addtoCart(product);

}
openDialog() {
  this.dialog.open(DialogElementsExampleDialog);
}
}
function DialogElementsExampleDialog(DialogElementsExampleDialog: any) {
  throw new Error('Function not implemented.');
}

