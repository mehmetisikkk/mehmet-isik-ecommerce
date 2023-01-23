import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError,delay } from 'rxjs';
import { PostComment } from 'src/app/Models/postComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  url_firebase="https://angular-bh-default-rtdb.firebaseio.com/";

  postComment(comment:any):Observable<any>{


    const httpOption={

      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })

    }

    return  this.http.post<any>(this.url_firebase+"comment.json",comment,httpOption).pipe(tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));
  }

  getComment():Observable<PostComment[]>{

    return  this.http.get<PostComment[]>(this.url_firebase+"comment.json").pipe(

      map(response=> {

      const comments: PostComment[]=[];

      for(const key in response)
      {
        comments.push({...response[key],id:key});
      }

      return comments;
    })

    );
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
