import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError, map } from 'rxjs';
import { AlertifyService } from 'src/app/Services/alertify/alertify.service';
import { Basket } from '../Models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private http:HttpClient, private alerty: AlertifyService) {

  }

  url_firebase="https://angular-bh-default-rtdb.firebaseio.com/";





  postBasket(item:Basket):Observable<Basket[]>{


    const httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })
    }



    return  this.http.post<Basket[]>(this.url_firebase+"/basket.json",item,httpOption)

  }

  getBasket(item?:string, item2?:string):Observable<Basket[]>{




    return  this.http.get<Basket[]>(this.url_firebase+"/basket.json").pipe(

      map(response=> {

      const Baskets: Basket[]=[];

      for(const key in response)
      {
         Baskets.push({...response[key],id:key});
      }

      Baskets.forEach(element => {
        console.log(element.bookId);
      });




      return Baskets;
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
