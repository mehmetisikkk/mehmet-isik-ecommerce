import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/Services/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  isAuthenticated:boolean=false;

  email:string;

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {

    this.authService.user.subscribe(user=>{

      if(user!=null)
      {
        this.email=user.email;

      }

      this.isAuthenticated=!user?false:true;
      this.isAuthenticated=!!user;


    })
  }

  OnLogOut(){
    this.authService.logout();
  }


}
