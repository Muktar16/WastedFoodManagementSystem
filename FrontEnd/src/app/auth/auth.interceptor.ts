import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { OtherService } from "../services/other.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private otherService : OtherService,private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('noauth')){
            return next.handle(req.clone());
        }
            
        else {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.otherService.getToken())
            });
            console.log(clonedreq)
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.router.navigateByUrl('/login');
                        }
                    })
            );
        }
    }
}