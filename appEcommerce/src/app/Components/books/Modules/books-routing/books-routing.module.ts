import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookhomeComponent } from '../../Components/bookhome/bookhome.component';
import { AuthenticationGuardCanActivate } from 'src/app/Components/authentication/Guards/authentication.guard';
import { BooksComponent } from '../../books.component';
import { BookcreateComponent } from '../../Components/bookcreate/bookcreate.component';
import { GenreComponent } from 'src/app/Components/genre/genre.component';
import { BookdetailsComponent } from '../../Components/bookdetails/bookdetails.component';
import { WishlistComponent } from '../../../wishlist/wishlist.component';


const routes:Routes=[

  {
    path:'books',
    component:BookhomeComponent,
    canActivate:[AuthenticationGuardCanActivate],
    children:[
      {path:'',component:BooksComponent},
      {path:'create',component:BookcreateComponent},
      {path:'genre/:genreId',component:BooksComponent},
      {path:':bookId',component:BookdetailsComponent},

    ]
  },

];



@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class BooksRoutingModule { }
