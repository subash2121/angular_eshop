import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { map,switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy{ 
  @Input('product') product:any;
  @Input('show-actions') showActions=true;
  shipping :any;
  cart:any;
  total:any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  subscription:any;
  userSubscription:any;
  userId: any;
  async placeOrder() {
    if (this.cart) {
      let c=this.cart.items
      console.log(this.cart.items);
      
      let order={
        userId:this.userId,
        datePlaced: new Date().getTime(),
        shipping:this.shipping,
        items:Object.keys(c).map(function(key, index){
          {
            console.log(c[key].product.title);
            
            return{
              product:{
                  title:c[key].product.title,
                  imageUrl:c[key].product.imageUrl,
                  price:c[key].product.price
              },
              quantity:c[key].quantity,
              totalPrice:c[key].product.price*c[key].quantity,
            }
        }})
      }
      console.log(order);
      
      let result=await this.orderService.storeOrder(order);
      this.shoppingCartService.clearCart();
      console.log(result.key);
      
      this.router.navigate(['/order-success'], {
      queryParams: { orderId: result.key },
    });
       
    }
   
  } 
  constructor(private shoppingCartService:ShoppingCartService,
    private router:Router,
    private orderService:OrderService,
    private authService:AuthService){
  }   
  async ngOnInit(){
    
    
    this.shipping=[];
    if(!this.showActions){
      await this.orderService.getOrder(this.product).valueChanges().subscribe((x:any)=>{this.shipping=x[2]
      console.log(x);
      }
      )
      
    }
    let cart$=await this.shoppingCartService.getCart();
    this.subscription= cart$.valueChanges().subscribe((x:any)=>{
      this.cart=x;
      console.log(x);
      
    }  
      )
      this.userSubscription=this.authService.user.subscribe((user:any)=>this.userId=user.uid)
     
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
