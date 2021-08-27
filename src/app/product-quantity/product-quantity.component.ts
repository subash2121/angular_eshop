import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product:any;
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
