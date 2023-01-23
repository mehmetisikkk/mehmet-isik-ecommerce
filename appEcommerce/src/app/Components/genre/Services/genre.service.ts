import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Genre } from '../Models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  url_firebase="https://angular-bh-default-rtdb.firebaseio.com/";

  constructor(private http:HttpClient) {

  }

  ngOnInit(): void {

  }


  getGenres():Observable<Genre[]>{

    return  this.http.get<Genre[]>(this.url_firebase+"genres.json").pipe(

      map(response=> {

      const genres: Genre[]=[];

      for(const key in response)
      {
        genres.push({...response[key],id:key});
      }

      return genres;
    })

    );
  }


  hasValue=false;


  hasGenre(item: string) {

    let categories = this.getGenres().
      subscribe(c => {
        c.forEach(element => {

          for (let index = 0; index < c.length; index++) {

            const elem = c[index];

            if (elem.genrename == item) {

              this.hasValue = true;
            }

          }

        });
      }
      )

    return this.hasValue;
  }


  postGenre(item:Genre):Observable<Genre[]>{


    const httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })
    }



    return  this.http.post<Genre[]>(this.url_firebase+"genres.json",item,httpOption)

  }


}
