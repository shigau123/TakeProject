import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../Services/api-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProdDataModel } from '../Model/prod.model';

export interface ProductInterface {
  name:string,
  price:number,
  quantity:number,
  imgUrl:any,
  _id:any
}
export interface UsersInterface{
  fullname:string,
  email:any,
  password:any,
  role:string,
  _id:any
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentUsers:any
  currentAdmins:any
  currentProductsStock:any
  productData: any
  dataSource:any
  dataSource_01:any
  displayedColumns: string[] = ['S.no','id','name', 'price', 'quantity','imgUrl','actions'];
  displayedColumns_01: string[] = ['S.no','id','name', 'email', 'role','actions'];
  productForm!: FormGroup
  TotalUser_AdminList:any
  adminList:any
  userList:any
  List:any
  isloading:any
  prodEdit:any
  panelOpenState = false;
  // panelOpenState1 = false;
  userrole='admin'
  isAdd_btnVisible:boolean=true
  isEdit_btnVisible:boolean=false
  ProductModelObj:ProdDataModel=new ProdDataModel()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatPaginator) paginator_01!: MatPaginator;
  constructor(private router:Router,private apiService:ApiServiceService, private form: FormBuilder){}
  ngOnInit(): void {
    this.isloading=true
    //Product adding
    this.productForm= this.form.group({
    // id: this.form.control (""),
    name: this.form.control('',Validators.required),
    price:this.form.control('',[Validators.required]),
    quantity:this.form.control('',Validators.required),
    imgUrl:this.form.control('',Validators.required)
  })
  this.getAllProductData()
  this.totalList()
  // this.dataSource_01.paginator = this.paginator_01;
  // this.dataSource_01=this.TotalUser_AdminList
  }


//Admin reg form
  adminForm:FormGroup=new FormGroup({
    fullname: new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required),
    role:new FormControl('',Validators.required)
  })

  validateadmin(){
    this.isloading=true
    this.apiService.registerUser(this.adminForm.value).subscribe((res)=>{
      console.log(res,'res');

      alert(res.message)
      this.isloading=res.error

      document.getElementById('closebtn1')?.click()
      this.isloading=res.error
      this.totalList()

    },err=>{alert('Invalid User / User already exists')})
  }

  totalList(){
    this.isloading=true
    this.apiService.getUsers().subscribe((res)=>{
      this.userList=res.response.filter((list:UsersInterface)=>{
        return list.role!=='admin'&& list.role!=='Admin' ;
      })
      this.adminList=res.response.filter((list:UsersInterface)=>{
        return list.role==='admin'|| list.role==='Admin'
      })
      this.dataSource_01=new MatTableDataSource<UsersInterface>(res.response);
      // console.log(this.dataSource_01);
      // this.dataSource_01.paginator = this.paginator_01;
      // this.List=res.response
      // this.TotalUser_AdminList=res.response
      // console.log(this.TotalUser_AdminList);
      this.currentUsers=this.userList.length
      this.currentAdmins=this.adminList.length
      this.isloading=false
      })
  }
  getAdmins(){
    this.dataSource_01=this.adminList
  }
  getUsers(){
    this.dataSource_01=this.userList
  }

  deleteUser(id:any){
    this.isloading=true
    this.apiService.deleteUsers(id).subscribe((res)=>{
      alert(res.message)
      this.totalList()
      this.isloading=false
    })
  }

validateproduct(){

  this.isloading=true
  console.log(this.productForm.value);
  this.apiService.addProduct(this.productForm.value).subscribe(res=>{
    console.log('posted sucessfully'+res)
    console.log(res);
    this.isloading=res.error
    this.productForm.reset();
    window.alert('posted sucessfully')
    this.getAllProductData()

  })
    document.getElementById('closebtn2')?.click() //for auto close once done
}
getAllProductData(){
  this.isloading=true
  this.apiService.getProducts().subscribe((res)=>{
    console.log(res.response);
    console.log(res);

    this.dataSource=new MatTableDataSource<ProductInterface>(res.response);
    this.currentProductsStock=res.response.length//getting total products list
    console.log(this.currentProductsStock);
    this.dataSource.paginator = this.paginator;
    this.isloading=res.error
    // window.alert("data fetched succesfully")

  })
}

deteteProd(id:any){
  this.isloading=true
  this.apiService.deleteProduct(id).subscribe((res)=>{
    this.isloading=res.error
    alert(res.message)
    this.getAllProductData()
  })
}
//editing product details
onEdit(row:any){
  this.isEdit_btnVisible=true
  this.isAdd_btnVisible=false
  this.ProductModelObj._id=row._id
  this.productForm.controls['name'].setValue(row.name)
  this.productForm.controls['price'].setValue(row.price)
  this.productForm.controls['quantity'].setValue(row.quantity)
  this.productForm.controls['imgUrl'].setValue(row.imgUrl)
}
editproduct(){

  this.ProductModelObj.name=this.productForm.value.name
  this.ProductModelObj.price=this.productForm.value.price
  this.ProductModelObj.quantity=this.productForm.value.quantity
  this.ProductModelObj.imgUrl=this.productForm.value.imgUrl
  this.apiService.updateProduct(this.ProductModelObj,this.ProductModelObj._id).subscribe((res)=>{
    alert(res.message)
    this.getAllProductData()
  })
  document.getElementById('closebtn2')?.click()
  this.isEdit_btnVisible=false
  this.isAdd_btnVisible=true
  this.productForm.reset();
}

}
