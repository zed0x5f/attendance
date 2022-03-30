import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { FirebaseService } from "./firebase.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData: any; // Save logged in user data
  auth;
  provider;
  public isLoggedIn: boolean;
  constructor(
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public firebase:FirebaseService
  ) {
    this.auth = getAuth(this.firebase.app);
    this.provider = new GoogleAuthProvider();
    this.isLoggedIn = JSON.parse(localStorage.getItem("user") + "") !== 'null';
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */

    onAuthStateChanged(this.auth, (user) => {
      console.log("state has changed");
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.isLoggedIn = true;
      } else {
        localStorage.removeItem("user");
        this.isLoggedIn = false;
      }
    });
  }


  // Sign in with email/password
  SignIn(email: string, password: string) {
    console.log("signing in");
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
      this.router.navigate(["sign-in"]);
    });
  }
}