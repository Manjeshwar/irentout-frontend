import { Product } from './product';

// cart items
export interface wishItem {
    product: Product;
    quantity: number;
    tenures:number;
    tenure_price:number;
    deliveryDate:Date;
}