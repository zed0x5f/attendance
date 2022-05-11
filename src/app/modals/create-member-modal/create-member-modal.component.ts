import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  });
  title: string = '';
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  dismiss() {}

  save() {}
}
