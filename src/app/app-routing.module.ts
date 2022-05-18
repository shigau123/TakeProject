import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';


const routes: Routes = [
  {path: "", redirectTo:'auth', pathMatch:'full'},
  {path:"auth", loadChildren:()=>import("./auth/auth.module").then(m=> m.AuthModule)},
  {path:"admin",loadChildren:()=>import("./admin/admin.module").then(m=>m.AdminModule),canActivate:[AuthGuard]},
  {path:'products',loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
