import { Component } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, map } from 'rxjs';
import { SignInComponent } from './modals/sign-in/sign-in.component';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'attendance';
  name = '';
  isLoggedIn: Boolean = false;

  makeLink(a: string, b: string) {
    return {
      link: a,
      text: b,
    };
  }

  links: { link: string; text: string }[] = [
    // this.makeLink('/', 'Home Component'),
    this.makeLink('/console', 'console checkin'),
    this.makeLink('/admin/import-users', 'Volunteer/id upload'),
    this.makeLink('/admin/users', 'User management'),
    this.makeLink('/admin/members','manage members'),
    this.makeLink('/codes', 'codes for scanner'),
    this.makeLink('/exports', 'export page'),
    this.makeLink('/meal', 'Reactive meal singup'),
  ];

  constructor(
    private route: ActivatedRoute,
    // private afAuth: AngularFireAuth,
    private authService:AuthService,
    private modal: NgbModal,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.name = params['name'];
    });
    this.isLoggedIn = this.authService.isLoggedIn;

    this.authService.authChange.subscribe(foo=>{
      this.isLoggedIn = !!foo.currentUser
    })
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.close();
      });
  }

  signIn() {
    this.modal.open(SignInComponent);
  }

  async signOut() {
    // await this.afAuth.signOut();
    await this.authService.SignOut();
    await this.router.navigateByUrl('/');
  }

  isDropped = false;
  show = '';
  dropdown() {
    this.isDropped = !this.isDropped;
    this.show = this.isDropped ? 'show' : '';
  }

  close() {
    this.isDropped = false;
    this.show = '';
  }
}
