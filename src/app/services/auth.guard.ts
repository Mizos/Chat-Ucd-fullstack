import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthGuard implements CanActivate {
  
  user: Observable<firebase.User>

  constructor(private afa: AngularFireAuth, private router: Router) {
    this.user = this.afa.authState;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.user.map(auth => {
      if (!auth) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }).take(1);
  }
}
