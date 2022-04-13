import { Product } from './../../Shared/Products';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  constructor() { }
@Input() data!:any;
@Input() totalPrice!:Number;
  ngOnInit(): void {
    console.log(this.data);
  }

}
