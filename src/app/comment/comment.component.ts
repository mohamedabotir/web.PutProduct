import { ProductService } from './../Services/product.service';
import { Product } from './../../Shared/Products';
import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { Comments } from 'src/Shared/Comments';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit ,AfterContentInit{
@Input() ProductId!:Number;
comment!:Comments;
@Input()CommentDatas!:Comments[];
  constructor(private Product:ProductService) { }
  ngAfterContentInit(): void {
    console.log(this.CommentDatas)
  }

  ngOnInit(): void {

  }
 onSubmit(message:String){
 this.comment = {Message:message,ProductId:this.ProductId}
 this.Product.pushComment(this.comment).subscribe(data=>{
   this.CommentDatas.push(this.comment);
   console.log(data);
 });
console.log(message,this.ProductId);
 }

}
