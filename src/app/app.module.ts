import { CoreModule } from './core/core.module';
import { NotificationService } from './Services/notification.service';
import { ErrorInterceptorService } from './Services/error-interceptor.service';
import { ProductService } from './Services/product.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './Services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { InterceptorService } from './Services/interceptor.service';
import { ListProductsComponent } from './list-products/list-products.component';
import { RouterModule } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { CartService } from './Services/cart-service.service';
import { CartComponent } from './cart/cart.component';
import { DisplayProductComponent } from './display-product/display-product.component';
import { LogoutComponent } from './logout/logout.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { CommentComponent } from './comment/comment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LandingComponent } from './landing/landing.component';
import {MatInputModule} from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
@NgModule({
   declarations: [
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ProductEditComponent,
    ProfileComponent,
    CartComponent,
    DisplayProductComponent,
    LogoutComponent,
    OrdersHistoryComponent,
    OrderProductComponent,
    CommentComponent,
    LandingComponent,



  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    FormsModule,
    NgbModule,
    SlickCarouselModule,
    MatInputModule,
    MatButtonModule

  ],
  providers: [CartService,AuthService,ProductService,NotificationService,{
    provide:HTTP_INTERCEPTORS,
    useClass:InterceptorService,
    multi:true
  },{
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptorService,
    multi:true
  },



],
  bootstrap: [AppComponent]
})
export class AppModule { }
