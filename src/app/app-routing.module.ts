import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { GameDetailsComponent } from './game-list/game-details/game-details.component';
import { GameListComponent } from './game-list/game-list.component';
import { HasRoleGuard } from './login/has-role.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { OrderComponent } from './order/order.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: "full" },
  { path: 'home', component: GameListComponent },
  { path: 'details/:id', component: GameDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [HasRoleGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'order', component: OrderComponent, canActivate: [HasRoleGuard] },
  { path: 'purchasehistory', component: PurchaseHistoryComponent, canActivate: [HasRoleGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
