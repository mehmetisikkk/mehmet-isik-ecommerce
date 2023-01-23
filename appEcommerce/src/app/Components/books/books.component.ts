import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify/alertify.service';
import { AuthenticationService } from '../authentication/Services/authentication.service';
import { Genre } from '../genre/Models/genre';
import { Book } from './Models/book';
import { BooksService } from './Services/books.service';
import { GenreService } from '../genre/Services/genre.service';
import { WishlistService } from '../wishlist/Services/wishlist.service';
import { BasketService } from '../basket/Services/basket.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],

})
export class BooksComponent implements OnInit {

  constructor(private alertify: AlertifyService, private booksService: BooksService, private wishlistService: WishlistService, private basketService: BasketService, private genreService: GenreService, private activatedroute: ActivatedRoute, private authservice: AuthenticationService, private router:Router) {


    this.alerti = alertify;
  }

  alerti: any;
  public bookError: any;
  userlistbooks: string[] = [];

  userId: any;

  loading: boolean = false;

  books: Book[] = [];

  genres: Genre[] = [];

  popularBooks: Book[] = [];

  title: string = "Book list"

  filterText: string = '';
  filteredBooks: Book[];

  email: string;


  ngOnInit(): void {

    this.authservice.user.subscribe(user => {

      if (user) {

        this.userId = user.id;

        this.email = user.email;

        this.activatedroute.params.subscribe(params => {

          this.loading = true;

          var value = params["genreId"]

          this.booksService.getBooks(value).subscribe(data => {
            this.books = data;


            this.booksService.getMyList(this.userId).subscribe(data => {

              this.userlistbooks = data;

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


  getButtonState(item: any) {
    return this.userlistbooks.findIndex(m => m === item.id) > -1
  }


  addtoList($event: any, item: Book) {

    if ($event.target.classList.contains('btn-primary')) {
      $event.target.innerText = item.title + " Remove from Wishlist";
      $event.target.classList.remove('btn-primary');
      $event.target.classList.add('btn-danger');

      //  alertify.success(item.title+ " Add to List");

      //this.alerti.success(item.title);

      var id = 0;

      this.booksService.addtoMyList({ id: id, userId: this.userId, bookId: item.id }).subscribe(() => this.alerti.success(item.title + " Add to WishList"))
      this.wishlistService.postWishlist({ id: id, userId: this.userId, bookId: item.id }).subscribe(() => (""))
    }
    else {
      $event.target.innerText = item.title + " Add to Wishlist";
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');

      //  alertify.warning(item.title+ " Remove from List");

      // this.alerti.error(item.title);

      this.booksService.removetoMyList({ id: id, userId: this.userId, bookId: item.id }).subscribe(() => (""))
      this.wishlistService.removetoWishlist({ id: id, userId: this.userId, bookId: item.id }).subscribe(() => (""))
    }

  }


  Buy(item: Book) {


    var id = 0;

    this.basketService.postBasket({ id: id, userId: this.userId, bookId: item.id }).subscribe(() => (""))


  }

  closeDialog(event: any) {
    alert(event);

    this.bookError = null;
  }

  checked1:any;
  checked2:any;

  ispopular(event)
  {

    this.checked1= event.target.checked;

    alert("ispopular: "+   this.checked1);

  }

  isSoftCover(event)
  {

    this.checked2= event.target.checked;

    alert( "isSoftCover: "+  this.checked2);

  }


  Update(item: Book, title: any, description: any, productcode: any, isSoftCover: any, page: any, isPopular: any, imageUrl: any, subimageUrl: any, genreId: any) {



    if (genreId.value == "-1") {

      this.alertify.error("You should write genre");



      return;
    }



    else {




      var replacedata = { id: item.id, title: title.value, description: description.value, productcode: productcode.value, isSoftCover: this.checked2, page: page.value, isPopular: this.checked1, imageUrl: imageUrl.value, subimageUrl: subimageUrl.value, genreId: genreId.value, datePublished: new Date().toISOString().replace("T", " ").replace("Z", " ") }

      this.booksService.putBook(replacedata).subscribe(data => {
        this.books = data;


        this.booksService.getBooks(item.id).subscribe(data => this.router.navigate(['/books/create']));
        this.booksService.getBooks(item.id).subscribe(data => this.router.navigate(['/books']));
      })


    }
  }


  Delete(item: Book, title: any, description: any, productcode: any, isSoftCover: any, page: any, isPopular: any, imageUrl: any, subimageUrl: any, genreId: any) {







      var replacedata = { id: item.id, title: title.value, description: description.value, productcode: productcode.value, isSoftCover: this.checked2, page: page.value, isPopular: this.checked1, imageUrl: imageUrl.value, subimageUrl: subimageUrl.value, genreId: genreId.value, datePublished: new Date().toISOString().replace("T", " ").replace("Z", " ") }

      this.booksService.deleteBook(replacedata).subscribe(data => {
        this.books = data;


      })

      this.booksService.getBooks(item.id).subscribe(data => this.router.navigate(['/books/create']));
      this.booksService.getBooks(item.id).subscribe(data => this.router.navigate(['/books']));


  }

}




