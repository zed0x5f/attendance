import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {switchMap, take} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';
import {from} from 'rxjs';
import { Foo } from '../models/types';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private myAuth : AuthService) {}
    intercept(req : HttpRequest < any >, next : HttpHandler) {
        return this.myAuth.LoggedInObservable.pipe(switchMap((token2:Foo) => { // token.currentUser
            return from(this.myAuth.auth.currentUser !.getIdToken()).pipe(switchMap((token : string) => {
                console.log(token)
                console.log("token2",token2)
                let clone = req.clone();
                if (token) {
                    clone = clone.clone({
                        headers: req.headers.set('Authorization', 'Bearer ' + token)
                    });
                }
                return next.handle(clone);
            }))
        }));
    }
}

export const AuthTokenHttpInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true
};
