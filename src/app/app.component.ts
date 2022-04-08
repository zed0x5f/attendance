import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { SignInComponent } from './pageComponents/sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'attendance';
  name = '';
  loggedIn: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private modal: NgbModal,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.name = params['name'];
    });
    this.afAuth.authState.subscribe((user) => {
      this.loggedIn = !!user;
    });
  }
  signIn() {
    this.modal.open(SignInComponent);
  }

  async signOut() {
    await this.afAuth.signOut();
    await this.router.navigateByUrl('/');
  }
}
