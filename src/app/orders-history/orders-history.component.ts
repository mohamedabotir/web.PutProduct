import { AuthService } from './../Services/auth.service';
import { Order } from './../../Shared/Order';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {

orders!:Array<Order>
totalPaid=0;
Income=0;
userId:any;

  constructor(private products:ProductService,private userService:AuthService) { }

  ngOnInit(): void {
    this.userService.getUserId().subscribe(data=>{
      this.userId = data;
    });
    this.totalPaid = 0;
    this.products.getOrderHistory().subscribe(data=>{
      this.orders = data;
      this.orders.forEach(data=>{
        if(data.userId != this.userId)
        this.Income+=Number(data.totalPrice);
        else
        this.totalPaid +=Number(data.totalPrice)
      });
      console.log(this.orders);
      console.log(this.totalPaid);
    });
  }

}
