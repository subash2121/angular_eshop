import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input('product') product:any;
  @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart:any;
  constructor(private cartService:ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item=this.shoppingCart.items[this.product.key];
    return item ? item.quantity:0
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
}
