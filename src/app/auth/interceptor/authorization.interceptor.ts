import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private api:ApiServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const requestModifier = request.clone({
      headers:request.headers.append(
        'authorization',
        `Bearer ${this.api.getToken()} `
      )
    })
    return next.handle(requestModifier);
  }
}
