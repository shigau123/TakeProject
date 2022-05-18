import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { addProd, regData } from '../Model/reg.model';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService
{

  regAPIUrl : string = "https://ty-shoping-cart.herokuapp.com"

  constructor(private _http:HttpClient) { }

  registerUser(regData: string)
  {
    // return this.http.post<any>(`${this.regAPIUrl}login`,regData)
    return this._http.post<{error:boolean,message:string,response:any}>(`${this.regAPIUrl}/auth/register`, regData);
  }

  loginUser(formData:any){
    return this._http.post<{error:boolean, token:string, message:string, response:any}>(`${this.regAPIUrl}/auth/login`,formData)
  }
  getUsers(){
    return this._http.get<{error:boolean, token:string, message:string, response:any}>(`${this.regAPIUrl}/auth/get-users`)
  }
  deleteUsers(id:number){
    return this._http.delete<{error:boolean, token:string, message:string, response:any}>(`${this.regAPIUrl}/auth/delete-user/${id}`)
  }

  getToken(){
    return JSON.parse(localStorage.getItem('token')as string)
  }

  getRole(){
    let role=JSON.parse(localStorage.getItem('userRole')as string)
    if(role==='admin'||role==='Admin'){
      return true
    }else{
      return false
    }
  }


  getProducts(){
    return this._http.get<{error:boolean,message:string,response:any, products:addProd[]}>(`${this.regAPIUrl}/product/get-product-data`)
  }

  addProduct(product:addProd){
    return this._http.post<{error:boolean,message:string,response:any}>(`${this.regAPIUrl}/product/add-product-data`, product)
}
  deleteProduct(id:number){
  return this._http.delete<{error:boolean,message:string,response:addProd[]}>(`${this.regAPIUrl}/product/delete-data/${id} `)
}
  updateProduct(prod:any,id:number){
    return this._http.put<{error:boolean,message:string,response:addProd[]}>(`${this.regAPIUrl}/product/update-product-data/${id}`,prod)
  }

}
