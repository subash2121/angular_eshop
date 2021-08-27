import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { threadId } from 'worker_threads';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount: number;
  cart$:any;
  cd: any;
  item:any;
  total:number=0;
  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit(){
    
    this.cart$=await this.shoppingCartService.getCart();
    this.cart$.valueChanges().subscribe((cart:any)=>{
      this.cd=cart;
      this.total=0;    
      if (cart) {
        this.item=Object.keys(cart.items); 
      this.shoppingCartItemCount=0;
      for(let productId in cart.items){
        this.shoppingCartItemCount+=cart.items[productId].quantity;
        this.total=this.total+(cart.items[productId].product.price*cart.items[productId].quantity);
      }
      }
      
      

    })
  }
  clearCart(){
    this.shoppingCartService.clearCart();
    this.cd=null;
    this.shoppingCartItemCount=0;
  }
  isEmpty(){
    if(this.cd){
           
      if(Object.keys(this.cd.items).length)
        return true;
      return false;
    }
    return false;
  }

}
