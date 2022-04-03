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

  constructor(private products:ProductService) { }

  ngOnInit(): void {
    this.products.getOrderHistory().subscribe(data=>{
      this.orders = data;
      console.log(this.orders[0].orderProducts);
    });
  }

}
