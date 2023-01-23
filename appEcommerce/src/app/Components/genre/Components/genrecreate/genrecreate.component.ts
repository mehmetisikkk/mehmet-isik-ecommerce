import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify/alertify.service';
import { Genre } from '../../Models/genre';
import { GenreService } from '../../Services/genre.service';

@Component({
  selector: 'app-genrecreate',
  templateUrl: './genrecreate.component.html',
  styleUrls: ['./genrecreate.component.css'],
  providers:[GenreService]
})
export class GenrecreateComponent implements OnInit {

  constructor(private genreService: GenreService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  create(namevalue: string) {

    setTimeout(() => {

      const genre: Genre = {
        genrename: namevalue
      };

      let hasvalue = this.genreService.hasGenre(namevalue);

      if (!hasvalue) {
        const genre: Genre = {
          genrename: namevalue
        }
        this.genreService.postGenre(genre).subscribe(data => { console.log(data); this.router.navigate(['/books']) });
      }

      // else {
      //   this.alertify.warning(namevalue + " is already exist");
      // }





    }, 1000);



  }

}
