import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreComponent } from '../genre.component';
import { GenrecreateComponent } from '../Components/genrecreate/genrecreate.component';
import { RouterModule } from '@angular/router';
import { AuthenticationGuardCanActivate } from '../../authentication/Guards/authentication.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/Modules/shared.module';
import { BooksRoutingModule } from '../../books/Modules/books-routing/books-routing.module';



@NgModule({
  declarations: [
    GenreComponent,
    GenrecreateComponent,
  ],
  imports: [

    RouterModule.forChild([

      {path:'genres/create',component:GenrecreateComponent,canActivate:[AuthenticationGuardCanActivate]},

    ]),

    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    SharedModule,

  ],
  exports:[
    GenreComponent,
    GenrecreateComponent,
  ]
})
export class GenreModule { }
