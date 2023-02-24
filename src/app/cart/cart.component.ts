import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game-list/game.service';
import { AuthService } from '../login/auth.service';
import { userGame } from '../models/userGameModel';
import { cartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: userGame[];
  checkOutProducts: userGame[];
  totalPrice: any = 0;

  constructor(private gameService: GameService, private authService: AuthService, private cartService: cartService, private router: Router) { }

  ngOnInit(): void {
    this.getProductsForUser();
    this.cartService.buyCheck.subscribe((x: any) => {
      this.calculatePrice();
    });
    this.cartService.changeQuantity.subscribe((x: any) => {
      this.products[x.id].quantity = x.quantity;
      this.calculatePrice();
    });
    this.cartService._deleteOperationSuccessfulEvent$.subscribe((isSuccesfull: boolean) => {
      if (isSuccesfull) {
        this.getProductsForUser();
      }
    })
    this.cartService.numberOfItems.next(this.products.length + 1);
  }

  calculatePrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].buyCheck) {
        this.totalPrice = this.totalPrice + this.products[i].totalPrice * this.products[i].quantity;
      }
    }
  }

  getProductsForUser() {
    this.cartService.getProductsById(this.authService.user.id).subscribe((x: any) => {
      this.products = x;
      this.calculatePrice();
    })

  }

  checkOut() {
    this.gameService.onCheckOut.emit();
    let cartArray = [];
    /*this.cartService.deleteRange(this.authService.user.id).subscribe(() => {
      this.router.navigateByUrl("/home");
    })*/
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].buyCheck) {
        cartArray.push(this.products[i]);
      }
    }
    this.cartService.sendToOrder.emit(cartArray);
    this.router.navigateByUrl("/order");
  }

}
