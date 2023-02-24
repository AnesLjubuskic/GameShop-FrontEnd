import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { cartService } from '../cart/cart.service';
import { AuthService } from '../login/auth.service';
import { userGame } from '../models/userGameModel';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  products: userGame[];
  price: number = 0;
  constructor(private authService: AuthService, private cartService: cartService) { }

  ngOnInit(): void {
    this.getPurchaseHistory();
  }

  getPurchaseHistory() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    this.cartService.getPurchaseHistory(this.authService.user.id, headers).subscribe((x: any) => {
      this.products = x; console.log(this.products);
      this.calculatePrice();
    })
  }

  calculatePrice() {
    for (let i = 0; i < this.products.length; i++) {
      this.price = this.price + this.products[i].totalPrice;
    }
  }

}
