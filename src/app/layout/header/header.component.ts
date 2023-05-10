import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail:any;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService){
    this.isLoggedIn$ = of(false); 
  }

  ngOnInit(): void {
    this.userEmail=  JSON.parse (localStorage.getItem('user')!).email ;
    this.isLoggedIn$ = this.authService.isLoggedIn(); 
    
  }
  onLogOut(){
    this.authService.logOut();
  }
}
