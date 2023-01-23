import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from '../wishlist.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from '../../books/Modules/books-routing/books-routing.module';
import { SharedModule } from 'src/app/Shared/Modules/shared.module';
import { AuthenticationGuardCanActivate } from '../../authentication/Guards/authentication.guard';
import { KeyPipe } from '../Pipes/key.pipe';



@NgModule({
  declarations: [
    WishlistComponent,
    KeyPipe

  ],
  imports: [

    RouterModule.forChild([

      {path:'wishlist',component:WishlistComponent,canActivate:[AuthenticationGuardCanActivate]},

    ]),

    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    SharedModule,

  ],
  exports:[
    WishlistComponent,
  ]
})
export class WishlistModule { }
