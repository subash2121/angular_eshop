import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$: any;
  user: any;
  orders: any;
  id:string|null;
  constructor(private authService:AuthService,
    private orderService:OrderService,
    private route:ActivatedRoute) {
      
      authService.user.subscribe((x:any)=>{
        this.user=x
        this.orders$=orderService.getOrdersByUser(this.user.uid)
        this.orders$.subscribe((x:any)=>this.orders=x)
        
      })
     }

  async ngOnInit(){
  }

}
// return this.db.list('/products').snapshotChanges().map(changes=>{
//   return changes.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))
// })
// return changes.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))