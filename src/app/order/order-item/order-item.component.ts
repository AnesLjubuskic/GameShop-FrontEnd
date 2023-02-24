import { Component, Input, OnInit } from '@angular/core';
import { cartService } from 'src/app/cart/cart.service';
import { GameService } from 'src/app/game-list/game.service';
import { AuthService } from 'src/app/login/auth.service';
import { userGame } from 'src/app/models/userGameModel';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() item: userGame;
  game: any;
  constructor(private cartService: cartService, private gameService: GameService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getGame();
    console.log("child" + this.item);

  }
  getGame() {
    this.gameService.getGamesById(this.item.gameId).subscribe((x: any) => {
      this.game = x;
    })
  }


}
