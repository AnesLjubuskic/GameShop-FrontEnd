import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { gameFilterModel } from '../models/gameFilterModel';
import { MyConfig } from '../my-config';
import { GameService } from '../game-list/game.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() search = new EventEmitter<gameFilterModel>();
  filter: gameFilterModel = new gameFilterModel();
  visible = false;
  categories: any[];
  subcategories: any[];
  frmSearch: FormGroup;
  constructor(private http: HttpClient, private gameService: GameService) { }

  ngOnInit(): void {
    this.frmSearch = new FormGroup({
      'name': new FormControl(),
      'platform': new FormControl(),
      'categoryId': new FormControl(),
      'subCategoryId': new FormControl(),
      'page': new FormControl(),
      'pageSize': new FormControl(),
      'sort': new FormControl()
    });
    this.getCategories();
    this.getSubcategories();
  }

  getCategories() {
    this.gameService.getCategories().subscribe((x: any) => {
      this.categories = x;
    });
  }

  getSubcategories() {
    this.gameService.getSubCategories().subscribe((x: any) => {
      this.subcategories = x;
    })
  }

  onSearch() {
    if (this.frmSearch.value.categoryId == 'undefined') this.frmSearch.value.categoryId = undefined;
    if (this.frmSearch.value.subCategoryId == 'undefined') this.frmSearch.value.subCategoryId = undefined;
    if (this.frmSearch.value.platform == 'undefined') this.frmSearch.value.platform = undefined;
    this.filter.name = this.frmSearch.value.name;
    this.filter.categoryId = this.frmSearch.value.categoryId;
    this.filter.subCategoryId = this.frmSearch.value.subCategoryId;
    this.filter.platform = this.frmSearch.value.platform;
    this.filter.page = 1;
    this.filter.pageSize = 10;
    this.filter.sort = this.frmSearch.value.sort;
    this.search.emit(this.filter);
    this.gameService.paging$.next(true);
  }

  onClick() {
    this.visible = !this.visible;
  }

}
