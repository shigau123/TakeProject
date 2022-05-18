import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './auth/interceptor/authorization.interceptor';
import { CartComponent } from './products/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorizationInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
