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
CommentDatas!:Comments[];
  constructor(private Product:ProductService) { }
  ngAfterContentInit(): void {

  }

  ngOnInit(): void {
    this.Product.getComments(this.ProductId).subscribe(data=>{
      this.CommentDatas = data;
      console.log(this.CommentDatas);
    });
  }
 onSubmit(message:String){
 this.comment = {message:message,ProductId:this.ProductId,commentDateTime:new Date()}
 this.Product.pushComment(this.comment).subscribe(data=>{
   this.CommentDatas.push(this.comment);
   console.log(data);
 });
console.log(message,this.ProductId);
 }

}
