import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { WishList } from '../Models/wishlist';
import { AlertifyService } from '../../../Services/alertify/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient, private alerty: AlertifyService) {

  }

  url_firebase="https://angular-bh-default-rtdb.firebaseio.com/";



  removetoWishlist(item:WishList):Observable<WishList>{
    return this.http.delete<WishList>(this.url_firebase+"/wishlist/"+item.userId+"/list/"+item.bookId+".json",
    ).pipe(
      tap(data=>{console.log(data);
        this.alerty.error(" Remove from WishList");}),
      catchError(this.HandleError)
    )
  }


  postWishlist(item:WishList):Observable<WishList[]>{


    const httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })
    }



    return  this.http.post<WishList[]>(this.url_firebase+"/wishlist/"+item.userId+"/list/"+item.bookId+".json",item,httpOption)

  }

  getWishlist(item?:string):Observable<WishList[]>{




    return  this.http.get<WishList[]>(this.url_firebase+"/wishlist/"+item+"/list.json").pipe(

      map(response=> {

      const wishLists: WishList[]=[];

      for(const key in response)
      {
         wishLists.push({...response[key],id:key});
      }

      wishLists.forEach(element => {
        console.log(element.bookId);
      });




      return wishLists;
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
