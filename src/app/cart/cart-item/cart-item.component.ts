import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/game-list/game.service';
import { AuthService } from 'src/app/login/auth.service';
import { userGame } from 'src/app/models/userGameModel';
import { cartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() productDet: userGame;

  game: any;
  constructor(private cartService: cartService, private gameService: GameService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getGame();
  }



  getGame() {
    this.gameService.getGamesById(this.productDet.gameId).subscribe((x: any) => {
      this.game = x;
    })
  }

  buyChange() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    this.cartService.buyCheck.emit(this.productDet.buyCheck);
    this.cartService.updateCart(this.productDet, headers).subscribe(() => {
    });
    this.quantityChange();
  }

  quantityChange() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    this.cartService.changeQuantity.emit(this.productDet);
    this.cartService.updateCart(this.productDet, headers).subscribe(() => {
    });
  }

  delete() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    this.cartService.delete(this.game.id, this.authService.user.id,
      headers).subscribe(() => {
        this.cartService._deleteOperationSuccessfulEvent$.next(true);
      })
  }
}