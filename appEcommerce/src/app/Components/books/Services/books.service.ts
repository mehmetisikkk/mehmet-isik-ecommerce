import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, delay, throwError } from 'rxjs';
import { WishList } from '../../wishlist/Models/wishlist';

import { Book } from '../Models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) {

  }

  url_firebase="https://angular-bh-default-rtdb.firebaseio.com/";


  getBooks(genrebookId):Observable<Book[]>{

    let newurl=this.url_firebase+"books.json";

    if(genrebookId)
    {

      newurl+='?genrebookId='+genrebookId;


    }





    return  this.http.get<Book[]>(newurl).pipe(
      map(response=> {

        const movies:Book[]=[];

        for (let key in response) {

          if(genrebookId)
          {
            if(genrebookId==response[key].genreId)
            {
              movies.push({...response[key],id:key});
            }
          }

          // if(publisherId)
          // {
          //   if(publisherId==response[key].publisherId)
          //   {
          //     movies.push({...response[key],id:key});
          //   }
          // }

          // if(authorId)
          // {
          //   if(authorId==response[key].authorId)
          //   {
          //     movies.push({...response[key],id:key});
          //   }
          // }

          // if(languageId)
          // {
          //   if(languageId==response[key].languageId)
          //   {
          //     movies.push({...response[key],id:key});
          //   }
          // }

          // if(yearId)
          // {
          //   if(yearId==response[key].yearId)
          //   {
          //     movies.push({...response[key],id:key});
          //   }
          // }

          else
          {

            movies.push({...response[key],id:key});
          }

        }

        return movies;
      }),
      tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));

  }


  getBookById(bookId:any):Observable<Book>{



    return  this.http.get<Book>(this.url_firebase+"books/"+bookId+".json").pipe(tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));
  }


  postBook(book:any):Observable<any>{


    const httpOption={

      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })

    }

    return  this.http.post<any>(this.url_firebase+"books.json",book,httpOption).pipe(tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));
  }



  putBook(item:any):Observable<any>{

    const httpOption={

      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })

    }

    return  this.http.put<any>(this.url_firebase+"books/"+item.id+".json",item,httpOption).pipe(tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));


  }

  deleteBook(item:any):Observable<any>{

    const httpOption={

      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })

    }

    return  this.http.delete<any>(this.url_firebase+"books/"+item.id+".json",item).pipe(tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));


  }

  addtoMyList(item:WishList):Observable<WishList>{
    return this.http.post<WishList>(this.url_firebase+"/users/"+item.userId+"/list/"+item.bookId+".json",
    {
      dateAdded:new Date().getTime()
    }).pipe(
      tap(data=>console.log(data)),
      catchError(this.HandleError)
    )
  }


  removetoMyList(item:WishList):Observable<WishList>{
    return this.http.delete<WishList>(this.url_firebase+"/users/"+item.userId+"/list/"+item.bookId+".json",
    ).pipe(
      tap(data=>console.log(data)),
      catchError(this.HandleError)
    )
  }

  getMyList(userId:string):Observable<string[]>{

    return this.http.get<string[]>(this.url_firebase+"/users/"+userId+"/list.json")
    .pipe(
     map(response=>{

      const books:string[]=[];

      for(const key in response)
      {
        books.push(key);
      }

      return books;

     }),
     tap(data=>console.log(data)),
     catchError(this.HandleError)

    )
  }


  uploadSignature(vals): Observable<any>{
    let data = vals;
    return this.http.post('https://api.cloudinary.com/v1_1/sociala/upload',data)
  }


  private HandleError(error: HttpErrorResponse)
  {

    if(error.error instanceof ErrorEvent)
    {

      console.log("Error: "+ error.error.message);

    }
    else{

      switch (error.status) {
        case 404:
          console.log("404 Error: \n"+ error.message);
          break;

          case 403:
            console.log("403 Error: \n"+ error.message);
           break;

           case 500:
            console.log("500 Error: \n"+ error.message);
           break;

        default:
          console.log("Some unknow Error: \n"+ error.message);
      }
    }
    return throwError(()=>new Error ("from HandleError: "+error.message));
  }



}


