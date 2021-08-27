import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnDestroy,OnInit {
  isMenuCollapsed=true;
  user:any;
  subscription:any;
  admin:any;
  shoppingCartItemCount:number;
  constructor(public auth:AuthService,private shoppingCartService:ShoppingCartService) { 
  }

  logout(){
    this.auth.logout();
  }
  isAdmin(){
    if (this.admin)
      return true;
    return false;
  }
  async ngOnInit(){
    this.user=this.auth.user$;
    this.subscription=this.auth.appUser$.subscribe(x=>this.admin=x);
    let cart$=await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe((cart:any)=>{
      this.shoppingCartItemCount=0;
      if(cart!=null){
        for(let productId in cart.items)
        this.shoppingCartItemCount+=cart.items[productId].quantity
      }
      
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
