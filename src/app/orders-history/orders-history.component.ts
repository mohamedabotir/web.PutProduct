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
totalPaid!:number

  constructor(private products:ProductService) { }

  ngOnInit(): void {
    this.totalPaid = 0;
    this.products.getOrderHistory().subscribe(data=>{
      this.orders = data;
      this.orders.forEach(data=>{
        this.totalPaid +=Number(data.totalPrice)
      });
      console.log(this.orders);
      console.log(this.totalPaid);
    });
  }

}
