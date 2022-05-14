import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateMemberModalComponent } from 'src/app/modals/create-member-modal/create-member-modal.component';
import { FireBaseListDict as ListDict, Member } from 'src/app/models/types';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-member-crud',
  templateUrl: './member-crud.component.html',
  styleUrls: ['./member-crud.component.scss'],
})
export class MemberCrudComponent implements OnInit {
  memberDictionary: ListDict<Member> = {};
  members: Member[] = [];
  constructor(private fb: FirebaseService, private modal: NgbModal) {
    this.fb.myMembersObservable.subscribe((mMembers) => {
      this.memberDictionary = mMembers;
      // console.log(mMembers)
      for (let [key, value] of Object.entries(mMembers)) {
        value.key = key;
        this.members.push(value);
        // console.log(value);
      }
      // console.log(this.members)
    });
  }

  ngOnInit(): void {}

  open(): [NgbModalRef, CreateMemberModalComponent] {
    let ref = this.modal.open(CreateMemberModalComponent);
    return [ref, ref.componentInstance];
  }

  create() {
    let [ref, instance] = this.open();
    instance.members = this.members;
    instance.genInstanceKey();
  }

  edit(id: string) {
    let [ref, instance] = this.open();
    instance.member = this.memberDictionary[id];
    instance.members = this.members;
  }

  sort(sortDirection: string) {
    console.log(sortDirection);
  }
}
