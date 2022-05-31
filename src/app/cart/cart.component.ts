import { ToastrService } from 'ngx-toastr';
import {render } from 'creditcardpayments/creditCardPayments'
import { CartService } from './../Services/cart-service.service';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from 'src/Shared/Products';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { validateCode } from './promo.validation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnChanges,AfterViewInit {
  @Input() qty!:Number;
  @ViewChild('payment') span!:ElementRef;
  @ViewChild('payment1') span2!:ElementRef;
  spinner!:TemplateRef<any>|null
   paypalClicked=0;
  TotalPrice=-1;
  code=new FormControl(null,{
    updateOn:'blur'
    })
  price:BehaviorSubject<number>=new BehaviorSubject<number>(0);
  constructor(private cartService:CartService,private toast:ToastrService) {


  }
  ngAfterViewInit(): void {
     this.code.setAsyncValidators(validateCode(this.TotalPrice));
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.products,changes+"saddsadsadsadasd");
  }
  products!:Product[];

  ngOnInit(): void {
   this.products = this.cartService.returnProducts();
     console.log(this.products);
    this.CalculateTotalPrice();
  }
  deleteItem(item:Product){
    this.cartService.Delete(item);
    console.log(item);
    for (let index = 0; index < this.products.length; index++) {
      if(this.products[index].id==item.id){
        this.products.splice(index,1);
        return;
      }
    }

  }

  pay(){
  this.cartService.Pay(this.products,this.code.value).subscribe(data=>{
    if(data){
      this.products=[];
    this.toast.success("Order processed successfully delivery will contact you with in 24hour")
   localStorage.setItem("products","");
  }
  console.log(data);
  });
}
increment(index:number){
  if(this.products[index].qty +1 >this.products[index].quantity)
  {this.toast.info(`maximum quantity from ${this.products[index].name.substring(0,28)} is ${this.products[index].quantity}`)}
  else{
  this.products[index].qty += 1;
this.CalculateTotalPrice();
}
}
decrement(index:number){
  if(this.products[index].qty -1 ==0){
    return;
  }
  else{
  this.products[index].qty -= 1;
  this.CalculateTotalPrice();
}
}

CalculateTotalPrice(){
  this.TotalPrice = 0;
  this.products.forEach(data=>{
   this.TotalPrice+=Number(data.price) * data.qty;
 });
 console.log(this.TotalPrice);
 console.log(this.span);



}

getRender(){
  this.paypalClicked++;
 console.log(this.span2);
  if(this.TotalPrice>=1)
    render({
      id: '#mypaypalButtons',
      value: this.getTotalPrice(),
      currency: 'US',
      onApprove:(state=>{
       this.pay();
        alert("payment Successfully");
      })
    });

}

checkCode(){
  if(this.code.hasError('value'))
  console.log(this.code.getError('value').toString());
  this.price.next(this.code.getError('value'));
  console.log(this.price.value.toString())
 }
getTotalPrice():string{
   if(this.code.hasError('value')&&this.TotalPrice!=-1){
    console.log(this.code.getError('value').toString());
   return this.code.getError('value').toString();
  }
  else
  return this.TotalPrice.toString();
}
}


