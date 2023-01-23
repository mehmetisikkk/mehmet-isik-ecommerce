import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify/alertify.service';
import { AuthenticationService } from '../authentication/Services/authentication.service';
import { Book } from '../books/Models/book';
import { BooksService } from '../books/Services/books.service';
import { Genre } from '../genre/Models/genre';
import { GenreService } from '../genre/Services/genre.service';
import { WishList } from './Models/wishlist';
import { WishlistService } from './Services/wishlist.service';
import { BasketService } from '../basket/Services/basket.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  @Input('bookId') id: string;
  books: Book[]=[];
  genres: Genre[]=[];



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

  constructor(private alertify: AlertifyService, private booksService: BooksService,  private wishlistService: WishlistService, private basketService: BasketService, private genreService: GenreService, private activatedroute:ActivatedRoute, private authservice: AuthenticationService) { }


  ngOnInit(): void {

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

              this.wishLists.forEach(element => {



              });



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


  Delete(item:Book){

    var id=0;

    this.booksService.removetoMyList({id:id,userId:this.userId, bookId:item.id}).subscribe(()=> (""))

    this.wishlistService.removetoWishlist({id:id,userId:this.userId, bookId:item.id}).subscribe(()=> (""))


    setTimeout(() => {

      this.wishlistService.getWishlist(this.userId).subscribe(data => {

        this.wishLists = data;




      }, error => { this.bookError = error; console.log(error) });

    }, 1500);

  }

  Buy(item:Book)
  {

    var id=0;

    this.basketService.postBasket({id:id,userId:this.userId, bookId:item.id}).subscribe(()=> (""))




    setTimeout(() => {

      this.wishlistService.getWishlist(this.userId).subscribe(data => {

        this.wishLists = data;




      }, error => { this.bookError = error; console.log(error) });

    }, 1500);
  }
}
