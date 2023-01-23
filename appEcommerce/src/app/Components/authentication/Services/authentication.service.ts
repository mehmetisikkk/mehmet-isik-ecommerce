import { Injectable } from '@angular/core';
import { BehaviorSubject,tap } from 'rxjs';
import { User } from '../Models/user';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../Models/authResponse';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  key="AIzaSyBXsxF1DlNkV93WeHa5PnbJ3rsbMd6wzUU";
  SingUpUrl="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  SingInUrl="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";


  user=new BehaviorSubject<User>(null);

  constructor(private http:HttpClient) {

  }

  singUp(email:string,password:string){
   return this.http.post<AuthResponse>(this.SingUpUrl+environment.api_key,
      {
        email:email,
        password:password,
        returnSecureToken:true
      }).pipe(tap(response=>{
        const expirationDate=new Date(new Date().getTime()+(Number(response.expiresIn)*1000));
        const user= new User(response.email,response.localId,response.idToken, expirationDate);

        this.user.next(user);

        localStorage.setItem("user",JSON.stringify(user));

      //  this.handleAuthentication(response.email,response.localId,response.idToken,+response.expiresIn)

      }));
  }

  logIn(email:string,password:string){
    return this.http.post<AuthResponse>(this.SingInUrl+environment.api_key,
       {
         email:email,
         password:password,
         returnSecureToken:true
       }).pipe(tap(response=>{
        const expirationDate=new Date(new Date().getTime()+(Number(response.expiresIn)*1000));
        const user= new User(response.email,response.localId,response.idToken, expirationDate);

        this.user.next(user);

        localStorage.setItem("user",JSON.stringify(user));

    //    this.handleAuthentication(response.email,response.localId,response.idToken,+response.expiresIn)

      }));
   }

   logout()
   {
    this.user.next(null);
    localStorage.setItem("user",JSON.stringify(null));
    localStorage.removeItem("user");
   }

   autoLogin()
   {
    const user:User= JSON.parse(localStorage.getItem("user"));

    if(!user)
    {
      return;
    }

    const loadedUser=new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpiration)
      );

      if(loadedUser.token)
      {
        this.user.next(loadedUser);
      }

   }

   handleAuthentication(email:string,userId:string,token:string,expiresIn:number)
   {

    const expirationDate=new Date(new Date().getTime()+(Number()*1000));
    const user= new User(email,userId,token, expirationDate);

    this.user.next(user);

    localStorage.setItem("user",JSON.stringify(user));

   }
}
