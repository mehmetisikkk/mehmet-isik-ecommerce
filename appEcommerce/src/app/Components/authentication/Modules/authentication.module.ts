import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from '../authentication.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/Modules/shared.module';



@NgModule({

  declarations:[
    AuthenticationComponent],
  imports:[
    RouterModule.forChild([

      {path:'',component:AuthenticationComponent}

    ]),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule

  ],
  exports:[AuthenticationComponent]
})

export class AuthenticationModule { }
