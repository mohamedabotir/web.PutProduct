import { environment } from './../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../Services/cart-service.service';
import { AuthService } from './../Services/auth.service';
import { ProductService } from './../Services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/Shared/Products';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  selectedCategory!:Array<Product>;
public static data:Product[]=[];
 Products?:Array<Product>;
 Temp?:Product;
 userId?:any;
  constructor(private cartService:CartService,private Product:ProductService,private auth:AuthService,private tos:ToastrService) { }

  ngOnInit(): void {
    this.selectedCategory = [];
    this.auth.getUserId().subscribe(data=>{
    this.userId = data;
    });

this.getProducts();

  }
  getProducts():void{
    this.Product.getProducts().subscribe(data=>{
      this.Products = data;
      this.selectedCategory = data;
      console.log(data);
    });
  }
  onDelete(id:Number):void{
this.Product.deleteProduct(id).subscribe(data=>{
  console.log(data);
  this.getProducts();
});
  }
  track(index:Number,Product:Product){
    return Product.id;
  }
  addToCart(product:Product){
    this.cartService.orderCount++;
    ListProductsComponent.data.push(product);
   this.cartService.AddToCart(product);
  }
  slides = [
    {img: "https://dummyimage.com/350x150/423b42/fff"},
    {img: "https://dummyimage.com/350x150/2a2b7a/fff"},
    {img: "https://dummyimage.com/350x150/1a2b7a/fff"},
    {img: "https://dummyimage.com/350x150/7a2b7a/fff"},
    {img: "https://dummyimage.com/350x150/9a2b7a/fff"},
    {img: "https://dummyimage.com/350x150/5a2b7a/fff"},
    {img: "https://dummyimage.com/350x150/4a2b7a/fff"}
  ];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

  slickInit(e:any) {
    console.log('slick initialized');
  }

  breakpoint(e:any) {
    console.log('breakpoint');
  }

  afterChange(e:any) {
    console.log('afterChange');
  }

  beforeChange(e:any) {
    console.log('beforeChange');
  }
  select(sel:number){
    this.Products = this.selectedCategory;
    if(sel!=5)
   this.Products = this.Products?.filter((e): Product | undefined => {
     if (e.categoryId == sel)
       return e;

       return undefined;
   })
   console.log(this.Products);

  }
  priceFilter(min:any,max:any){
    if(this.Products?.length===0){
      this.Products = this.selectedCategory;
    }
    this.Products = this.Products?.filter((e): Product | undefined => {
      if (e.price <=max && e.price>=min)
        return e;

        return undefined;
    })
  }


}
