import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceptor', req);
        //const copiedReq = req.clone({headers: req.headers.append('', '')});
        const copiedReq = req.clone({params: req.params.set('auth', this.authService.getIdToken())});
        return next.handle(copiedReq);
    }
}