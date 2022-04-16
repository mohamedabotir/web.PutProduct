import { Comments } from './../../Shared/Comments';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../Services/product.service';
import { Product } from './../../Shared/Products';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart-service.service';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit  {
productId!:Number;
ProductData!:Product;
CommentsData!:Comments[];
  constructor(private Product:ProductService,private route:ActivatedRoute,private cartService:CartService) {
     this.ProductData = {id:0,description:"",quantity:0,name:"",price:0,categoryId:0,imageUrl:"",userName:"",qty:0,userId:""};
  }


  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.productId = data["id"];
       this.getComments();
      this.getProduct();
    });


  }
getComments(){
  console.log(this.productId,"asddas");
  this.Product.getComments(this.productId).subscribe(data=>{
      this.CommentsData = data;
      console.log(this.CommentsData);
    });
}
  getProduct(){
    this.Product.getProduct(this.productId).subscribe(data=>{
       this.ProductData = data;
    });
    }
    addToCart(product:Product){
     this.cartService.AddToCart(product);
    }
}
