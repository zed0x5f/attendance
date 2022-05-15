import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/models/types';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Util } from 'src/app/service/util';

@Component({
  selector: 'app-create-member-modal',
  templateUrl: './create-member-modal.component.html',
  styleUrls: ['./create-member-modal.component.scss'],
})
export class CreateMemberModalComponent implements OnInit {
  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    key: new FormControl(''),
    pin: new FormControl(''),
    personType: new FormControl(''),
    status: new FormControl(''),
  });
  save() {
    console.log(this.form.value);
    let bob = Util.clone(this.form.value);
    delete bob.key;
    this.fb.saveMember(this.form.value.key, bob);
    this.modal.close();
  }
  title: string = '';
  constructor(public modal: NgbActiveModal, private fb: FirebaseService) {}

  newMemberKey: string = '';
  @Input() members: Member[] = [];
  @Input() member: Member | null = null;
  ngOnInit(): void {
    this.form.patchValue({
      personType: 'nrg',
      status: 'active',
    });
  }

  init() {
    if (this.member != null) this.form.patchValue(this.member);
  }

  genInstanceKey() {
    this.generateKeySuggestion(this.members);
  }

  private generateKeySuggestion(members: Member[]) {
    let max = 0;
    console.log(members);
    members.forEach((m) => {
      let number = parseInt(m.key!);
      if (number > max) max = number;
    });
    max += 1;
    this.newMemberKey = max + '';
    console.log(max);
    this.form.patchValue({ key: '' + max });
  }

  dismiss() {
    this.modal.close();
  }
}
