import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../app.component';
import { NavigationBarComponent } from '../Components/navigation-bar/navigation-bar.component';
import { AuthenticationComponent } from '../Components/authentication/authentication.component';
import { AlertComponent } from '../Shared/alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AuthenticationModule } from '../Components/authentication/Modules/authentication.module';
import { BooksComponent } from '../Components/books/books.component';
import { BookFilterPipe } from '../Components/books/Pipes/book-filter.pipe';
import { BookcreateComponent } from '../Components/books/Components/bookcreate/bookcreate.component';
import { BookdetailsComponent } from '../Components/books/Components/bookdetails/bookdetails.component';
import { BookhomeComponent } from '../Components/books/Components/bookhome/bookhome.component';
import { BooksModule } from '../Components/books/Modules/books/books.module';
import { CoreModule } from '../core/core.module';
import { WishlistComponent } from '../Components/wishlist/wishlist.component';
import { BasketComponent } from '../Components/basket/basket.component';
import { WishlistModule } from '../Components/wishlist/Modules/wishlist.module';
import { BasketModule } from '../Components/basket/Modules/basket.module';
import { GenreModule } from '../Components/genre/Modules/genre.module';






@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,




  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,

    GenreModule,
    WishlistModule,
    BasketModule,

    AppRoutingModule,
    CoreModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
