import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/service/user';
import { AuthService } from 'src/app/service/auth.service';

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
    private authService:AuthService
    // private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {

    //todo 
    this.userService.users$.subscribe(users=>{
      this.users = users;
      this.user = users.find(e=>e.email==this.authService.userData.email)!;
    })
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
