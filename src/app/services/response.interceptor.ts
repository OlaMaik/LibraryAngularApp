import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response && response.status === 401) {
          window.location.href = '';
          localStorage.removeItem('JWT');
          localStorage.removeItem('Id');
        }
        else if (response && response.status === 400) {
          if (response.error.error == "invalid_grant") {
            alert("Sorry, there is no user with this credentials");
          }
          else {
            window.location.href = '';
            alert("Bad request");
         
          }
        }
        else if (response && response.status === 404) {
          window.location.href = '';
          alert(response.error);
      
        }
        else if (response && response.status === 409) {
          alert(response.error);
        }
        else if (response && response.status === 500) {
          alert('Server error');
        }
        else if (response && response.status === 403) {
          window.location.href = '/registration';
        }
        else {
          return throwError(response);
        }
      })
    ) as Observable<HttpEvent<any>>;
  }
}
