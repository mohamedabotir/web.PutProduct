import { Order } from 'src/Shared/Order';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Product } from 'src/Shared/Products';
import { Comments } from './../../Shared/Comments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
apiPath = environment.url;
  constructor(private push:HttpClient,private Auth:AuthService) {


  }
pushProduct(data:Product):Observable<Product>{
return this.push.post<Product>(this.apiPath+"product/create",data);
}
getProducts():Observable<Product[]>{
  return this.push.get<Product[]>(this.apiPath+"product/products");
}
getProduct(id:any):Observable<Product>{
return this.push.get<Product>(this.apiPath+"product/"+id);
}
deleteProduct(id:Number):Observable<Product>{
  return this.push.delete<Product>(this.apiPath+"product/RemoveProduct/"+id);
}
updateProduct(product:Product):Observable<Product>{
  return this.push.put<Product>(this.apiPath+"product/Update",product);
}

getOrderHistory():Observable<Array<Order>>{
  return this.push.get<Array<Order>>(this.apiPath+"product/OrderHistory");
}

pushComment(Comment:Comments):Observable<Comments>{
  return this.push.post<Comments>(this.apiPath+"Product/Comment",Comment);
}
getComments(id:Number):Observable<Comments[]>{
  return this.push.get<Comments[]>(this.apiPath+"Product/GetComments?id="+id);
}

updateComment(comment:Comments){
return this.push.put<string>(this.apiPath+"Product/UpdateComment",comment);
}

deleteComment(id:Number){
  return this.push.delete<string>(this.apiPath+"Product/DeleteComment?id="+id);
  }
}
