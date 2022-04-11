import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserFormService } from '../services/user-form.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/service/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user: User | null = null;

  constructor(
    private userService: UserService,
    private userForm: UserFormService,
    private modal: NgbModal,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.userService.users$.subscribe((u) => {
      this.users = u;
    });

    this.afAuth.user.subscribe((user) => {
      if (user != null)
        this.user = {
          uid: user.uid,
          displayName: user.displayName!,
          email: user.email!,
        };
    });
  }

  create() {
    this.userForm.create();
    const modalRef = this.modal.open(UserFormComponent);
    modalRef.result
      .then((user) => {
        this.userService.create(user).subscribe((_) => {
          console.log('user created');
        });
      })
      .catch((err) => {});
  }

  edit(userToEdit: User) {
    this.userForm.edit(userToEdit);
    // const modalRef = this.modal.open(UserFormComponent);
    // once user form pop up is closed, we get the value as a result
    // modalRef.result.then(user => {
    //   this.userService.edit(user).subscribe(_ => {
    //     console.log('user edited');
    //   });
    // }).catch(err => {

    // });
  }
}
