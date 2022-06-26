import { AppComponent } from './../app.component';
import { ListProductsComponent } from './../list-products/list-products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../Services/cart-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ListProductsComponent,AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    FormsModule,
    NgbModule
  ],
  exports:[ListProductsComponent,AppComponent],
  providers:[CartService]
})
export class CoreModule { }
