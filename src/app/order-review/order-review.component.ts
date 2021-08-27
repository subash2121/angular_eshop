import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.css']
})
export class OrderReviewComponent implements OnInit {
  id:any;
  order: any;
  constructor(private route:ActivatedRoute,
    private orderService:OrderService) {
    this.id=route.snapshot.paramMap.get('id');
    this.order=this.id;
    orderService.getOrder(this.id).valueChanges().subscribe((x:any)=>{
      this.order=x[1];
    })
   }

  ngOnInit(): void {
  }

}
