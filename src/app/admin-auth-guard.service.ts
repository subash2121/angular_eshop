import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { analytics } from 'firebase';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth:AuthService,private userService:UserService) { }
  canActivate():Observable<boolean>{
    return this.auth.user.switchMap((user:any)=>{
      return this.userService.get(user.uid);
    }).map((appUser:any)=>appUser.isAdmin);
  }
}
