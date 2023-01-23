import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from '../basket.component';
import { RouterModule } from '@angular/router';
import { AuthenticationGuardCanActivate } from '../../authentication/Guards/authentication.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from '../../books/Modules/books-routing/books-routing.module';
import { SharedModule } from 'src/app/Shared/Modules/shared.module';



@NgModule({
  declarations: [
    BasketComponent,
  ],
  imports: [

    RouterModule.forChild([

      {path:'basket',component: BasketComponent,canActivate:[AuthenticationGuardCanActivate]},

    ]),

    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    SharedModule,
  ],
  exports:[
    BasketComponent,
  ]
})
export class BasketModule { }
