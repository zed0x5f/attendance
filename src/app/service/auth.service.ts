import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
} from 'firebase/auth';
import { Observable } from 'rxjs';
import { FooAuth } from '../models/types';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getAuth() {
    return this.auth;
  }
  userData: any; // Save logged in user data
  auth;
  provider;
  public isLoggedIn: boolean;
  constructor(
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public firebase: FirebaseService
  ) {
    this.auth = getAuth(this.firebase.app);
    this.provider = new GoogleAuthProvider();
    this.isLoggedIn = JSON.parse(localStorage.getItem('user') + '') !== null;
    console.log(
      'logged in state ',
      this.isLoggedIn,
      JSON.parse(localStorage.getItem('user') + '')
    );

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this._authChange = new Observable((observer) => {
      this.observeAuthChange(observer);
    });
    this._LoggedInAuth = new Observable((observer) => {
      this._authChange.subscribe((foo) => {
        if (this.isLoggedIn) observer.next(this.getUserFoo());
      });
    });
  }
  private observeAuthChange(observer: any) {
    onAuthStateChanged(this.auth, (user) => {
      console.log('auth state has changed');
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.isLoggedIn = true;
      } else {
        localStorage.removeItem('user');
        this.isLoggedIn = false;
      }
      observer.next(this.getUserFoo());
    });
  }

  private getUserFoo(): FooAuth {
    return {
      auth: this.auth,
      currentUser: this.auth.currentUser,
    };
  }

  private _LoggedInAuth: Observable<FooAuth>;
  public get LoggedInObservable(): Observable<FooAuth> {
    return this._LoggedInAuth;
  }

  private _authChange: Observable<FooAuth>;
  public get authChange() {
    return this._authChange;
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    console.log('signing in');
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    // return this.ngFireAuth.currentUser.then(u => {
    //     return u!.sendEmailVerification();
    // })
    // .then(() => {
    //   this.router.navigate(['verify-email-address']);
    // })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    // return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    // .then(() => {
    //   window.alert('Password reset email sent, check your inbox.');
    // }).catch((error) => {
    //   window.alert(error)
    // })
  }

  // Sign in with Google
  GoogleAuth() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  // Sign out
  SignOut() {
    return this.auth.signOut().then(() => {
      // localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }
}
