import { Component, Input, OnInit } from '@angular/core';
import { cartService } from 'src/app/cart/cart.service';
import { GameService } from 'src/app/game-list/game.service';
import { AuthService } from 'src/app/login/auth.service';
import { userGame } from 'src/app/models/userGameModel';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.css']
})
export class PurchaseItemComponent implements OnInit {
  @Input() productDet: userGame;
  game: any;
  constructor(private gameService: GameService, private cartService: cartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getGame();
  }
  getGame() {
    this.gameService.getGamesById(this.productDet.gameId).subscribe((x: any) => {
      this.game = x;
      console.log(this.game);

    })
  }



}
