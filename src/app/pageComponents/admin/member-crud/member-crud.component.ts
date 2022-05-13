import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateMemberModalComponent } from 'src/app/modals/create-member-modal/create-member-modal.component';
import { Member } from 'src/app/models/types';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-member-crud',
  templateUrl: './member-crud.component.html',
  styleUrls: ['./member-crud.component.scss'],
})
export class MemberCrudComponent implements OnInit {
  members: Member[] = [];
  constructor(private fb: FirebaseService, private modal: NgbModal) {
    this.fb.myMembersObservable.subscribe((mMembers) => {
      // console.log(mMembers)
      for (let [key, value] of Object.entries(mMembers)) {
        value.key = key;
        this.members.push(value);
        console.log(value);
      }
      // console.log(this.members)
    });
  }

  ngOnInit(): void {}
  create() {
    this.modal.open(CreateMemberModalComponent);
    
  }
}
