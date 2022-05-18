import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiServiceService } from '../Services/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
cartitemlist:any=[]
productlist=new BehaviorSubject<any>([])
  constructor(private http:HttpClient, private api:ApiServiceService) { }
  getProduct(){
    return this.productlist.asObservable()
  }
  setProduct(products:any){
    this.cartitemlist.push(...products);
    this.productlist.next(products)
  }
  addtoCart(products:any){
    this.cartitemlist.push(products);
    this.productlist.next(this.cartitemlist);
    this.gettotalprice()
    console.log(this.cartitemlist);
    
  }
  gettotalprice(){
    let grandTotal=0
    this.cartitemlist.map((a:any)=>{
      grandTotal+=a.total
    })
  }
  removecartitem(products:any){
    this.cartitemlist.map((a:any, index:any)=>{
       if(products.id===a.id){
         this.cartitemlist.splice(index,1)
       }
    })
  }
  removeallcart(){
    this.cartitemlist=[]
    this.productlist.next(this.cartitemlist)
  }
  paymentmethod(carddata:string){
    return this.http.post<any>(`${this.api.regAPIUrl}/payment/add-payment-data`,carddata)
  }
}
