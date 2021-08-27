import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import * as SerialPort from 'serialport';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  constructor(private db:AngularFireDatabase) { 

  }
  private create(){   
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }
  async getCart(){
    let cartId=await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId)
  }
  async getCartItems(){
    let cartId=await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId+'/items/')
  }
  private async getOrCreateCartId(){
    let cartId=localStorage.getItem('cartId');
    if (cartId) return cartId;
      let result:any=await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;  

  }
  async addToCart(product:any){
    let cartId=await this.getOrCreateCartId();
    let item$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.key)
    let items$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.key).valueChanges();
    items$.take(1).subscribe((item:any)=>{
      if (item) {
        item$.update({quantity:item.quantity +1});
        
      } else {
        item$.set({product:product,quantity:1});
        
      }
    })

  }
  async removeFromCart(product:any){
    let cartId=await this.getOrCreateCartId();
    let item$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.key)
    let items$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.key).valueChanges();
    items$.take(1).subscribe((item:any)=>{
      if(item===0)
        item$.remove();
      else if (item) 
        item$.update({quantity:item.quantity -1});
          })
  }

  async clearCart(){
    let cartId=await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  }
