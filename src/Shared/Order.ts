import { Product } from 'src/Shared/Products';
export interface Order{
orderProducts:Product[],
totalPrice:Number,
discountCode?:string,
orderTime:Date,
id:Number,
userId:string
}
