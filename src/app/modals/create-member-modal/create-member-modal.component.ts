import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/models/types';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-create-member-modal',
  templateUrl: './create-member-modal.component.html',
  styleUrls: ['./create-member-modal.component.scss'],
})
export class CreateMemberModalComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    key: new FormControl(''),
    pin: new FormControl(''),
    personType:new FormControl('')
  });
  title: string = '';
  constructor(public modal: NgbActiveModal, private fb: FirebaseService) {}

  newMemberKey: string = '';
  members: Member[] = [];
  ngOnInit(): void {
    this.fb.myMembersObservable.subscribe((members) => {
      this.members = [];
      let max = 0;
      for (const [key, member] of Object.entries(members)) {
        member.key = key;
        this.members.push(member);
        let number = parseInt(key);
        if (number > max) max = number;
      }
      this.newMemberKey = max + 1 + '';
      this.form.patchValue({ key: this.newMemberKey });
    });
  }

  dismiss() {
    this.modal.close();
  }

  save() {}
}
