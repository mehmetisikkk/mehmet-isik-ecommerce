import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { Observable,take, exhaustMap} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthenticationService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    return this.authService.user.pipe(
      take(1),
      exhaustMap(user=>{

        if(!user)
        {
          return next.handle(req);
        }

        const updateReq=req.clone({
          params:new HttpParams().set('auth',user.token)
        });

        return next.handle(updateReq);
      })
    )
  }
}
