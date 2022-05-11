import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}
  SignIn(email: string, password: string) {
    console.log('component sign in');
    this.authService
      .SignIn(email, password)
      .then((userCredential:UserCredential) => {
        // Signed in
        this.router.navigate(['console']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        console.log(errorMessage);
        //TODO make nice banner thing in html
        alert(errorMessage);
      });
  }
}
