import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
    // password: new FormControl(''),
    role: new FormControl(''),
  });
  title: string = '';
  user: {} = {};

  constructor(public modal: NgbActiveModal) {}

  setUser(i: any) {
    this.user = i;
    i['password'] = '';
    if (!('role' in i)) i['role'] = null;
    console.log('user set');
    this.form.patchValue(i);
  }

  ngOnInit() {
  }

  dismiss() {
    this.modal.dismiss('modal dismissed');
  }

  save() {
    const { displayName, email, role, uid } = this.form.value;
    console.log('modal close');
    this.modal.close({ displayName, email, role, uid });
    
  }
}
