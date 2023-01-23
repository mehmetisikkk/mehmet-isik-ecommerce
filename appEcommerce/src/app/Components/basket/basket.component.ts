import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify/alertify.service';
import { AuthenticationService } from '../authentication/Services/authentication.service';
import { Book } from '../books/Models/book';
import { BooksService } from '../books/Services/books.service';
import { Genre } from '../genre/Models/genre';
import { GenreService } from '../genre/Services/genre.service';
import { WishlistService } from '../wishlist/Services/wishlist.service';
import { Basket } from './Models/basket';
import { BasketService } from './Services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  books: Book[]=[];
  genres: Genre[]=[];

  baskets: any[]=[];

  userId:any;

  loading:boolean=false;


  popularBooks: Book[]=[];

  title: string = "Book list"

  filterText: string = '';
  filteredBooks: Book[];

  alerti:any;
  public bookError:any;
  userlistbooks:string[]=[];

  bookId:any;

wishLists: any[]=[];

  constructor(private alertify: AlertifyService, private booksService: BooksService, private basketService: BasketService, private wishlistService: WishlistService, private genreService: GenreService, private activatedroute:ActivatedRoute, private authservice: AuthenticationService) { }


  ngOnInit(): void {

    document.querySelectorAll('table tr').forEach(function(e, i) {
      if (e.textContent.trim().length == 0) { // if row is empty
          e.parentNode.removeChild(e);
      }
  })

    this.authservice.user.subscribe(user=>{

      if(user){

        this.userId = user.id;

        this.activatedroute.params.subscribe(params => {

          this.loading = true;

          var value = params["genreId"]

          this.booksService.getBooks(value).subscribe(data => {
            this.books = data;


            this.booksService.getMyList(this.userId).subscribe(data => {

              this.userlistbooks = data;


              this.userlistbooks.forEach(element => {

                this.bookId=element;


              });

            }, error => { this.bookError = error; console.log(error) });



            this.wishlistService.getWishlist(this.userId).subscribe(data => {

              this.wishLists = data;



            }, error => { this.bookError = error; console.log(error) });



            this.basketService.getBasket(this.userId, this.bookId).subscribe(data => {

              this.baskets = data;



            }, error => { this.bookError = error; console.log(error) });

            this.loading = false;

            this.popularBooks = this.books.filter(i => i.isPopular);
          }, error => { this.bookError = error; console.log(error) });


          this.genreService.getGenres().subscribe(data => {

            this.genres = data;

          }, error => { this.bookError = error; console.log(error) });

      });


    }

    });
  }

}
