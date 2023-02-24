import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MyConfig } from '../my-config';
import { GameService } from './game.service';
import { AuthService } from '../login/auth.service';
import { gameFilterModel } from '../models/gameFilterModel';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  @Input() openModal = false;
  filter = new gameFilterModel();
  games: any[];
  gameSingle: any = {
    'name': '',
    'price': 0,
    'description': '',
    'releaseDate': 19 - 10 - 2020,
    'imageURL': '',
    'quantity': 0,
    'editMode': false,
    'platform': 0,
    'categoryId': 1,
    'subCategoryId': 1
  };
  category: any[];
  subcategory: any[];
  isFetching: boolean = false;
  tableSize: number = 10;
  page: number = 1;
  constructor(private gameService: GameService, public authService: AuthService) { }

  ngOnInit(): void {

    this.getGames();
    this.fetchCategory();
    this.fetchSubcategory();
    this.gameService.addEditEvent$.subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.getGames();
      }
    })
    this.onTableDataChange(1);
    this.gameService.paging$.subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.getGames();
        this.onTableDataChange(1);
      }
    })
  }

  getGames() {
    this.isFetching = true;
    this.gameService.getGames(this.filter)
      .subscribe((x: any) => {
        this.isFetching = false;
        this.games = x;

      });
  }

  openAddGame() {
    this.openModal = true;
  }

  closeAddGame() {
    this.openModal = false;

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

  onSearch(event: any) {
    this.filter = event;
    console.log(this.filter);
    this.getGames();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.filter.page = this.page;
    this.filter.pageSize = this.tableSize;
    this.getGames();

  }

}
