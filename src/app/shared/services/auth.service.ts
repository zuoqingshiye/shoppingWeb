import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../../shared/models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
  ) {
    this.user$ = afAuth.authState;
  }

  // Auth logic to run auth providers
  AuthLogin() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((success: any) => {
        
      }).catch((error) => {
        console.log(error)
      })
  }
  Signout() {
    return this.afAuth.signOut().then(() => {
      window.location.href = '/';
    })
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .pipe(
      switchMap(user => 
      {
        if (user) return this.userService.get(user.uid).valueChanges();
        return of(null);
      })
    )
  }

}