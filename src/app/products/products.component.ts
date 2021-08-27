import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessThanValidator } from 'ng2-validation';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category.service';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products:any;
  filteredProducts:any;
  subscription:Subscription
  category:any;
  cart:any;
  constructor(
    private shoppingCartService:ShoppingCartService,
    route:ActivatedRoute,
    productService:ProductService) {
     
    productService.getAll().subscribe(products=>{
      this.products=products;
      route.queryParamMap.subscribe(params=>{
        this.category=params.get('category');
        this.filteredProducts=(this.category && this.products)?
          this.products.filter((p:any)=>p.category===this.category) : 
          this.products;
      })
    });
   }
   async ngOnInit(){
    this.subscription=(await this.shoppingCartService.getCart()).valueChanges().subscribe((cart:any)=>this.cart=cart);
   }

   ngOnDestroy(){
     this.subscription.unsubscribe();
     
   }
}
