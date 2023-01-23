import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from 'src/app/Components/genre/Models/genre';
import { GenreService } from 'src/app/Components/genre/Services/genre.service';
import { AlertifyService } from 'src/app/Services/alertify/alertify.service';
import { BooksService } from '../../Services/books.service';

@Component({
  selector: 'app-bookcreate',
  templateUrl: './bookcreate.component.html',
  styleUrls: ['./bookcreate.component.css'],
  providers: [GenreService, BooksService, AlertifyService]
})
export class BookcreateComponent implements OnInit {

  genres: Genre[] = [];

  model:any={genreId:-1};

  file:any;

  urlimage:any;

  async getfile(event:any) {

    this.file=event.target.files[0];

  }

  constructor(private genreService: GenreService, private bookservice: BooksService, private alertifyService: AlertifyService, private router: Router, private http:HttpClient) { }

  ngOnInit(): void {

    this.genreService.getGenres().subscribe(data => { this.genres = data });

  }

  movieform = new FormGroup({

    title_: new FormControl("Book title",[Validators.required, Validators.minLength(1)]),
    description_: new FormControl("Book description",[Validators.required]),
    productcode_: new FormControl("0000",[Validators.required]),
    isSoftCover_: new FormControl("true",[Validators.required]),
    page_: new FormControl("0000",[Validators.required]),
    isPopular_: new FormControl("true",[Validators.required]),
    imageUrl_: new FormControl("../../../../../assets/logo.png",[Validators.required]),
    genreId_: new FormControl("-1",[Validators.required]),
    subimageUrl_: new FormControl("",[Validators.required])

  });


  isFormValid() : boolean {
    return this.movieform.disabled ? true : this.movieform.valid
  }


  async createBook(){


    let formData=new FormData();

    formData.set('file', this.file);

    formData.append("file", this.file);

    formData.append("upload_preset", "angular-ecommerce");

   this.bookservice.uploadSignature(formData).subscribe((imageData) => {
    this.urlimage = imageData.url;

    console.log(this.urlimage);


    const movie = {
      title: this.movieform.value.title_,
      description: this.movieform.value.description_,
      productcode: this.movieform.value.productcode_,
      isSoftCover: this.movieform.value.isSoftCover_,
      page: this.movieform.value.page_,
      isPopular: this.movieform.value.isPopular_,
      datePublished: new Date().toISOString().replace("T"," ").replace("Z"," "),
      imageUrl: this.movieform.value.imageUrl_,
      genreId: this.movieform.value.genreId_,
      subimageUrl: this.urlimage,
    }





    if(this.movieform.value.title_!="" && this.movieform.value.description_!=""  && this.movieform.value.imageUrl_!=""  && this.movieform.value.genreId_!="")
    {




      this.bookservice.postBook(movie).subscribe(data => {console.log(data); this.router.navigate(['/books'])});

      this.alertifyService.success(movie.title);

    }
    else{

      this.alertifyService.error("Select genre");
    }
  })





  }

  ClearForm(){

    this.movieform.patchValue({

      title_: '',
      description_: '',
      imageUrl_: '',
      genreId_:'-1',

    });

  }
}


