import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { ApiServiceService } from '../Services/api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private authService:ApiServiceService,private router:Router ){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      if(this.authService.getRole()){
        return true
      }else{
        window.alert("you need to login to visit this page");
        this.router.navigate(['/auth','login'])
        return false
      }
  }

}
