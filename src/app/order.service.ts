import { Injectable } from '@angular/core';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase) {
    
   }
   storeOrder(order:any){
     return this.db.list('/orders').push(order);
  }
  getOrders(){
    return this.db.list('/orders').snapshotChanges().map(changes=>{
         return changes.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))
       }) 
  }
  getOrdersByUser(userId:string){
    return this.db.list('/orders',ref=>ref.orderByChild('userId').equalTo(userId)).snapshotChanges().map(changes=>{
      return changes.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))
    })

  }
  getOrder(id:string){
    return this.db.list('/orders/'+id);
  }
}
// return this.db.list('/products').snapshotChanges().map(changes=>{
//   return changes.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))
// }) 
// this.filteredProducts=(query) ?
//       this.products$.filter((p:any)=>p.title.toLowerCase().includes(query.toLowerCase())) :
//       this.products$;
// return changes.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))