import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameItemComponent } from './Game-List/game-item/game-item.component';
import { SearchComponent } from './search/search.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { GameDetailsComponent } from './game-list/game-details/game-details.component';
import { AddEditGameComponent } from './game-list/add-edit-game/add-edit-game.component';
import { CartComponent } from './cart/cart.component';

import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { PagingComponent } from './paging/paging.component';
import { OrderComponent } from './order/order.component';
import { OrderItemComponent } from './order/order-item/order-item.component';
import { PurchaseItemComponent } from './purchase-history/purchase-item/purchase-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameListComponent,
    GameItemComponent,
    SearchComponent,
    DropdownDirective,
    GameDetailsComponent,
    AddEditGameComponent,
    CartComponent,

    PurchaseHistoryComponent,
    LoginComponent,
    RegisterComponent,
    CartItemComponent,
    PagingComponent,
    OrderComponent,
    OrderItemComponent,
    PurchaseItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ],
  providers: [
    HttpClient

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
