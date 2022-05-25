import { Profile } from './../../Shared/Profile';
import { AuthService } from './../Services/auth.service';
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
commentOperation!:Comments;
message!:string;
userData!:any
  constructor(private Product:ProductService,private userService:AuthService) { }
  ngAfterContentInit(): void {

  }

  ngOnInit(): void {

     this.userService.getUserId().subscribe(data=>{
      this.userService.getProfile(data as string).subscribe(profile=>{
        this.userData = {name:profile.name};
        console.log(this.userData);
      })
    });
    this.Product.getComments(this.ProductId).subscribe(data=>{
      this.CommentDatas = data;
      console.log(this.CommentDatas);
    });
  }
 onSubmit(message:String){
 this.comment = {message:message,productId:this.ProductId,commentDateTime:new Date(),id:0}
 this.Product.pushComment(this.comment).subscribe(data=>{
   this.CommentDatas.push(data);
   console.log(data);
 });
console.log(message,this.ProductId);
 }
 onEdit(comment:Comments){
   this.commentOperation =comment;
console.log(comment);
 }

 Update(){
   this.commentOperation.message = this.message;
   this.Product.updateComment(this.commentOperation).subscribe(data=>{
     console.log(data);
   });
   console.log(this.commentOperation);
 }
 ondelete(comment:Comments){
   var index=this.CommentDatas.indexOf(comment)
   console.log(index);
   console.log(comment);
   this.Product.deleteComment(comment.id).subscribe(data=>{
     this.CommentDatas.splice(index,1)
   });

 }

}
