import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './Components/authentication/Modules/authentication.module';



const routes:Routes=[



  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'books',loadChildren:()=>import('./Components/books/Modules/books/books.module').then(m=>m.BooksModule)},
  {path:'auth',loadChildren:()=>import('./Components/authentication/Modules/authentication.module').then(m=>m.AuthenticationModule)},


]

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
