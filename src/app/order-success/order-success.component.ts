import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  orderId:string;
  queryParamsSubscription: Subscription;
  constructor(route:ActivatedRoute,router:Router) {
    this.queryParamsSubscription = route.queryParams.subscribe(
      (params: Params) => {
        this.orderId = params.orderId;
        console.log(this.orderId);
        
        // if (!params.orderId) {
        //   console.error('Tried to access order-success without an orderId');
        //   router.navigate(['/']);
        // }
      }
    );
   }

  ngOnInit(): void {
  }

}
