import { Component, OnInit } from '@angular/core';
import { Genre } from './Models/genre';
import { GenreService } from './Services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
  providers:[GenreService]
})
export class GenreComponent implements OnInit {

  genres:Genre[]=[];
  genre:Genre;

  selected:Genre=null;

  constructor(private genreservice: GenreService) {


  }

  ngOnInit(): void {

    this.genreservice.getGenres().subscribe(data=>{
      this.genres=data;
    },error=>{console.log(error)});

  }


  displayAll:boolean=true;

  select(item?:any)
  {
    if(item)
    {
      this.selected=item;
      this.displayAll=false;
    }
    else{
      this.selected=null;
      this.displayAll=true;
    }



  }

}
