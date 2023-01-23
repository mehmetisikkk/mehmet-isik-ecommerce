import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from './Models/authResponse';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {


  isLoginMode:boolean=true;
  public Error:any;

  constructor(private authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  OnToggleMode(){

    this.isLoginMode=!this.isLoginMode;

  }


  closeDialog(event: any) {
    alert(event);

    this.Error = null;
  }



  onSubmit(form:NgForm) {


    const email= form.value.email;
    const password= form.value.password;


    if(form.invalid)
    {
      return;
    }

    let authResponse:Observable<AuthResponse>;

    if(this.isLoginMode)
    {

     authResponse =this.authService.logIn(email,password);


   //  this.authService.logIn(email,password).subscribe(response=>{console.log(response)}, err=>{console.log(err)});




    }
    else{


      authResponse = this.authService.singUp(email,password);

    //  this.authService.singUp(email,password).subscribe(response=>{console.log(response)}, err=>{console.log(err)});



    }


     authResponse.subscribe(response=> {this.router.navigate['/books']}, err=>{this.Error=err; console.log(err)});



  }

}
