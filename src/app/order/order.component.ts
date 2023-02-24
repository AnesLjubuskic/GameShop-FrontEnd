import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartService } from '../cart/cart.service';
import { GameService } from '../game-list/game.service';
import { AuthService } from '../login/auth.service';
import { gameModel } from '../models/gameModel';
import { userGame } from '../models/userGameModel';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  products: userGame[];
  totalPrice: any = 0;
  game: gameModel[] = [];
  gamesById: any[];
  constructor(private cartService: cartService, private authService: AuthService, private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    /*this.cartService.sendToOrder.subscribe((x: any) => {
      this.products = x;
      console.log(x);
    })*/
    this.getOrders();
    this.getGames();
  }

  getProductsForUser() {
    this.cartService.getProductsById(this.authService.user.id).subscribe((x: any) => {
      this.products = x;
    })
  }

  getOrders() {
    this.cartService.getOrder(this.authService.user.id).subscribe((x: any) => {
      this.products = x;
      this.calculate();
      console.log(x);

    })
  }

  getGames() {
    this.gameService.getGames().subscribe((x: any) => {
      this.game = x;
      console.log(this.game);

    })
  }

  updateGame(game: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
  }

  /* checkOutFinal() {
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'bearer ' + this.authService.user.jwt
     }) || null;
     for (let i = 0; i < this.products.length; i++) {
       this.products[i].purchased = true;
       this.cartService.updateCart(this.products[i]).subscribe((x: any) => {
         console.log(x);
 
       });
       console.log("Logged " + this.products[i].purchased);
       let gameId = this.products[i].gameId;
       this.gameService.getGamesById(gameId).subscribe((x: any) => {
         x.quantity = x.quantity - this.products[i].quantity;
         this.gameService.putGames(x, headers);
       })
     }
     this.router.navigateByUrl("/home");
   }*/

  checkOutFinal() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    for (let i = 0; i < this.products.length; i++) {
      this.products[i].purchased = true;
    }
    this.cartService.updateRange(this.products, headers).subscribe(() => {
      this.gamesGetForUpdate();
    });
  }

  gamesGetForUpdate() {
    let gameIds = [];
    for (let i = 0; i < this.products.length; i++) {
      gameIds.push(this.products[i].gameId);
    }
    this.gameService.getGamesByMultipleIds(gameIds).subscribe((x: any) => {
      this.gamesById = x;
      this.updateQuantity();
    });
  }

  updateQuantity() {
    for (let i = 0; i < this.gamesById.length; i++) {
      this.gamesById[i].quantity = this.gamesById[i].quantity - this.products[i].quantity;
    }
    this.gameService.updateGameRange(this.gamesById).subscribe(() => {
      this.router.navigateByUrl("/home");
    })
  }

  calculate() {
    for (let i = 0; i < this.products.length; i++) {
      this.totalPrice = this.totalPrice + this.products[i].totalPrice;
    }
  }
}
