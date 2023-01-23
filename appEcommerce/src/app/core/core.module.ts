import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertifyService } from '../Services/alertify/alertify.service';
import { AuthenticationGuardCanActivate } from '../Components/authentication/Guards/authentication.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../Components/authentication/Services/authentication.interceptor.service';



@NgModule({

  providers: [AlertifyService, AuthenticationGuardCanActivate, {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]
})

export class CoreModule { }
