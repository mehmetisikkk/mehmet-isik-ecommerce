import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from '../../books.component';
import { BookdetailsComponent } from '../../Components/bookdetails/bookdetails.component';
import { BookFilterPipe } from '../../Pipes/book-filter.pipe';
import { BookcreateComponent } from '../../Components/bookcreate/bookcreate.component';
import { BookhomeComponent } from '../../Components/bookhome/bookhome.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from '../books-routing/books-routing.module';
import { GenreModule } from 'src/app/Components/genre/Modules/genre.module';
import { SharedModule } from 'src/app/Shared/Modules/shared.module';
import { WishlistModule } from 'src/app/Components/wishlist/Modules/wishlist.module';
import { BasketModule } from 'src/app/Components/basket/Modules/basket.module';


@NgModule({
  declarations: [

    BooksComponent,
    BookdetailsComponent,
    BookFilterPipe,
    BookcreateComponent,
    BookhomeComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    BooksRoutingModule,
    GenreModule,
    // WishlistModule,
    // BasketModule,
    SharedModule,
  ],
  exports: [
    BooksComponent,
    BookdetailsComponent,
    BookFilterPipe,
    BookcreateComponent,
    BookhomeComponent,
  ]
})
export class BooksModule { }
