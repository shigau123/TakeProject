import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  product:any
  toogle:any=false
empty:any
  constructor(private cart:CartserviceService) { }

  ngOnInit(): void {
    this.cart.getProduct().subscribe((res)=>{
      this.product=res
      this.empty=res
     
     })
  }
  remove(pro:any){
    this.cart.removecartitem(pro)
    
  }
  emptycart(pro:any){
    this.cart.removeallcart()
    this.toogle=!this.toogle
  }

}
