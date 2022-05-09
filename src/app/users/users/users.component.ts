import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
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
    private modal: NgbModal,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {

    //todo 
    this.afAuth.user.subscribe((user) => {
      console.log('user from arAuth');
      console.log(user);
      if (user != null)
        this.user = {
          uid: user.uid,
          displayName: user.displayName!,
          email: user.email!,
        };
        this.userService.users$.subscribe((u) => {
          console.log(u);
          this.users = u;
          this.user = this.users.find(e=>e.email==this.user?.email)!;
        });
        // 
    });

  }

  create() {
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
    console.log(userToEdit);
    const modalRef = this.modal.open(UserFormComponent);
    modalRef.componentInstance.setUser(userToEdit);
    // once user form pop up is closed, we get the value as a result
    
    modalRef.result
      .then((user) => {
        console.log("parent caught modal close")
        this.userService.edit(user).subscribe((_) => {
          console.log(_);
          console.log('user edited');
        });
      })
      .catch((err) => {
        console.log("parent mUserForm moal error")
        console.log(err);
      });
  }
}
