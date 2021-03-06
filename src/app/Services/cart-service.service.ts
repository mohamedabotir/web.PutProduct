import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Injectable, Output,EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/Shared/Products';
import {Order} from 'src/Shared/Order';
import { environment } from 'src/environments/environment';
let Cart:BehaviorSubject<Product>=new BehaviorSubject<Product>({id:0,description:'',name:'',price:0,categoryId:0,imageUrl:'',userId:'',userName:'',qty:0,quantity:0,product:null});

@Injectable({
  providedIn:'root'
})
export class  CartService {
  data:Product[]=[];
  Orders: Order;
  apiurl = environment.url
  orderCount=0;
  constructor(private toast:ToastrService,private http:HttpClient) {
    this.Orders={orderProducts:[],totalPrice:0,discountCode:"",orderTime:new Date(),id:0,userId:""};
  }
cart:Observable<Product[]>=new Observable<Product[]>();
returnProducts(){
  return JSON.parse(localStorage.getItem("products")!);
}

Delete(item:Product){
this.data =JSON.parse(localStorage.getItem("products")!);
for(let i=0 ;i<this.data.length;i++){
  if(this.data[i].id==item.id){
    this.data.splice(i,1);
  }
}
console.log(this.data);
localStorage.setItem("products",JSON.stringify(this.data));
}

  AddToCart(product:Product){
    Cart.next(product);
   let isFound = false
   if(product.quantity<1){
    this.toast.error("OutOfStock");
    return;
   }
    if(localStorage.getItem("products")){
      this.data = JSON.parse(localStorage.getItem("products")!);
      this.data.forEach(data=>{

        if(data.id == product.id){
           isFound=true;
          if(data.quantity < data.qty+1){
            this.toast.error("Exceed Limit");
            return;
          }
          data.qty = data.qty+1;
          localStorage.setItem("products",JSON.stringify(this.data));
        }
      })
      if(!isFound){
        product.qty=1;
        this.data.push(product);
        Cart.next(product);
        localStorage.setItem("products",JSON.stringify(this.data));
      }
    }else{
      product.qty=1;
      this.data.push(product);
      localStorage.setItem("products",JSON.stringify(this.data));
    }
    this.getLength();
  }
  Pay(products:Product[],discountCode:string):Observable<Order>{
    let TotalPrice = 0;
  products.forEach(data=>{
    TotalPrice+=Number(data.price) * data.qty;
  });
  console.log(TotalPrice,"  ",products);
  this.Orders.discountCode = discountCode;
  this.Orders.orderProducts = products;
  this.Orders.totalPrice=TotalPrice;
  console.log(JSON.stringify(this.Orders));
  return this.http.post<Order>(this.apiurl+"product/cart",this.Orders);
  }
  getLength(){
    this.cart.subscribe(data=>{
    this.orderCount = data.length;
    });
  }
}
