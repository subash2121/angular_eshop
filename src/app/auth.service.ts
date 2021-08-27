import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import {AppUser} from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { switchMap ,map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: any;
  user:any;
  url:string | null;
  returnUrl:any;
  constructor(private afFireAuth: AngularFireAuth,private route: ActivatedRoute,public router:Router,private userService: UserService,) {
    afFireAuth.authState.subscribe(x=>this.user$=x);
    this.user=afFireAuth.authState
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afFireAuth.auth.signOut();
  }
  get appUser$() : Observable<AppUser>{
    return this.user
    .pipe(switchMap((user:any) => {
      if (user)
        return this.userService.get(user.uid)
      return Observable.of(null);
    }))
    .pipe(map ((appUser:any) => {
      if(appUser)
        return appUser.isAdmin
      return false;
      }));    }

}