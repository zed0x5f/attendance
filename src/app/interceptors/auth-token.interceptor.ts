import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AngularFireAuth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.auth.idToken.pipe(
      switchMap((idToken) => {
        let clone = req.clone();
        console.log('Bearer ' + idToken);
        if (idToken) {
          clone = clone.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + idToken),
          });
        }
        return next.handle(clone);
      })
    );
  }
}

export const AuthTokenHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenInterceptor,
  multi: true,
};
