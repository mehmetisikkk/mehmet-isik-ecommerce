import { Component } from '@angular/core';
import { AuthenticationService } from './Components/authentication/Services/authentication.service';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appEcommerce';


  constructor(private authService: AuthenticationService) {

    console.log(environment.value);
    console.log(environment.production);

  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
