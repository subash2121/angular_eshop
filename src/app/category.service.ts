import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() { 
    // return this.db.list('/categories', (ref:any)=>{
    //   return ref.orderByChild('name');
    // }).valueChanges();
    return this.db.list('/categories').snapshotChanges().map(changes=>{
      return changes.map(c=>({key:c.payload.key, ...c.payload.val() as {}}))
    })  
  }
}
