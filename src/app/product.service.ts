import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  mypictures: any[] = [];

  ref: AngularFireList<any>;
  constructor(private db:AngularFireDatabase) {}
  create(product:any){
    this.db.list('/products').push(product);
  }
  getAll(){
    return this.db.list('/products').snapshotChanges().map(changes=>{
      return changes.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))
    })   
  }
  get(productId:any){
    return this.db.object('/products/'+productId);
  }
  update(productId:any,product:any){
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId:any){
    return this.db.object('/products/'+productId).remove();
  }
}
