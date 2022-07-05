import { LandingComponent } from './landing/landing.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { DisplayProductComponent } from './display-product/display-product.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'postProduct',component:ProductComponent,canActivate:[AuthGuardService]},
  {path:'',component:LandingComponent},
  {path:'products',component:ListProductsComponent},
  {path:'profile/:id',component:ProfileComponent},
  {path:'product/:id',component:ProductEditComponent,canActivate:[AuthGuardService]},
  {path:'getProduct/:id',component:DisplayProductComponent},
  {path:'checkout',component:CartComponent},
  {path:'logout',component:LogoutComponent},
  {path:'OrderHistory',component:OrdersHistoryComponent,canActivate:[AuthGuardService]},
  {path:'listProduct',component:ListProductsComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
