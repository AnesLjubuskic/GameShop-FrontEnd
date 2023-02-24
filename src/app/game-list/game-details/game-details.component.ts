import { AnimateTimings } from '@angular/animations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GameService } from '../game.service';
import { AuthService } from 'src/app/login/auth.service';
import { cartService } from 'src/app/cart/cart.service';
import { userGame } from 'src/app/models/userGameModel';
@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  @Input() openModal: boolean = false;
  category: any[];
  subcategory: any[];
  gameDetail: any;
  userGame: userGame[];
  inItem: any;
  id: number;
  cartItem: userGame = new userGame();

  constructor(private activeRoute: ActivatedRoute, public authService: AuthService, private cartService: cartService,
    private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.getGame(this.id);
      if (this.authService.isLogged) {
        this.getUserGames();
      }
      this.gameService.addEditEvent$.subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.getGame(this.id);
        }
      })
    })


    this.fetchCategory();
    this.fetchSubcategory();
  }

  getUserGames() {
    this.cartService.getProductsById(this.authService.user.id).subscribe((x: any) => {
      this.userGame = x;
    })
  }

  getGame(id: number) {
    this.gameService.getGamesById(id)
      .subscribe((x: any) => {
        this.gameDetail = x;
      })
  }

  openEditGame() {
    if (this.gameDetail.editMode) {
      alert("Game is currently being edited by another admin!")
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    this.gameDetail.editMode = true;
    this.gameService.putGames(this.gameDetail, headers).subscribe(() => {
      this.openModal = true;
    });
  }

  closeEditGame() {
    if (this.authService.user == undefined) {
      alert("Not Logged!")
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    this.gameDetail.editMode = false;
    this.gameService.putGames(this.gameDetail, headers).subscribe(() => {
      this.openModal = false;
    });

  }

  fetchCategory() {
    this.gameService.getCategories()
      .subscribe((x: any) => {
        this.category = x;
      });
  }

  fetchSubcategory() {
    this.gameService.getSubCategories()
      .subscribe((x: any) => {
        this.subcategory = x;
      });
  }

  deleteGame() {
    if (this.authService.user == undefined) {
      alert("Not Logged!")
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    if (confirm("Are you sure to delete this game?")) {
      this.gameDetail.softDelete = true;
      this.gameService.putGames(this.gameDetail, headers)
        .subscribe(() => {
          this.router.navigateByUrl('/home');
        })
    }
  }
  addToCart() {
    let exists = false;
    for (let i = 0; i < this.userGame.length; i++) {
      if (this.userGame[i].gameId == this.gameDetail.id) {
        exists = true;
        this.inItem = this.userGame[i];
      };
    }
    this.cartItem.gameId = this.gameDetail.id;
    this.cartItem.quantity = 1;
    this.cartItem.shippingPrice = 5;
    this.cartItem.totalPrice = this.gameDetail.price;
    this.cartItem.buyCheck = true;
    this.cartItem.userId = this.authService.user.id;
    this.cartItem.purchased = false;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    if (!exists) {
      this.cartService.addToCart(this.cartItem, headers).subscribe(() => {
        this.router.navigateByUrl("/cart");
      });
    }
    else {
      this.cartItem.quantity = this.inItem.quantity + 1;
      this.cartItem.id = this.inItem.id;
      this.cartService.updateCart(this.cartItem, headers).subscribe(() => {
        this.router.navigateByUrl("/cart");
      })
    }
  }

  goToCheckOut() {
    this.cartItem.gameId = this.gameDetail.id;
    this.cartItem.quantity = 1;
    this.cartItem.shippingPrice = 5;
    this.cartItem.totalPrice = this.gameDetail.price;
    this.cartItem.buyCheck = true;
    this.cartItem.userId = this.authService.user.id;
    this.cartItem.purchased = false;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    this.cartService.updateCart(this.cartItem, headers).subscribe(() => {
      this.router.navigateByUrl("/order");
    })
  }
}
