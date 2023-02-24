import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartService } from '../cart/cart.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  numberOfItems: any;
  constructor(public authService: AuthService, private router: Router, private cartService: cartService) { }

  ngOnInit(): void {
    this.cartService.numberOfItems.subscribe((x: number) => {
      this.numberOfItems = x;
      console.log(x);

    })
  }

  Logout() {
    this.authService.isLogged = false;
    localStorage.clear();

    this.router.navigateByUrl("/login");
  }

}
