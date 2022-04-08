import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public modal: NgbActiveModal, private afAuth: AngularFireAuth) {}

  async signIn() {
    try {
      const { email, password } = this.myForm.value;
      console.log(email);
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.modal.close();
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {}

  dismiss() {
    this.modal.dismiss();
  }
}
