import { Component, OnInit } from '@angular/core';
import { FireBaseListDict, Member } from 'src/app/models/types';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-console-checkin',
  templateUrl: './console-checkin.component.html',
  styleUrls: ['./console-checkin.component.scss'],
})
export class ConsoleCheckinComponent implements OnInit {
  constructor(private fb: FirebaseService) {}

  members: FireBaseListDict<Member> = {};
  ngOnInit(): void {
    this.fb.myMembersObservable.subscribe((members) => {
      this.members = members;

      for (const [key, value] of Object.entries(this.members)) {
        try {
          this.members[key].fullName = value.firstName + ' ' + value.lastName;
        } catch (err) {}
      }

      console.log(members);
    });
  }

  value = '';
  lastUpdate: number = 0;
  count = 0;

  update(value: string) {
    const delay = 600;
    this.value = value;
    this.lastUpdate = new Date().getTime();
    this.count += 1;
    console.log(`count:${this.count}`);
    setTimeout(() => {
      if (new Date().getTime() > this.lastUpdate + delay - 10) {
        this.saveCheckin(value);
        this.value = '';
      }
    }, delay);
  }

  enter() {
    console.log('click');
    this.saveCheckin(this.value);
  }

  submitValue = '';
  onSubmitValue(input: string) {
    this.submitValue = this.submitValue;
  }

  submit(thing:any) {
    //todo implement search feature
    console.log('submit',typeof thing,thing)
  }

  error = false;
  errorText: string = '';
  success: { fullName: string }[] = [];
  saveCheckin(id: string) {
    let checkMember = (id: string): boolean => {
      return this.members[id] != undefined;
    };
    this.error = !checkMember(id);
    //todo implent this component
    if (checkMember(id)) {
      //save checkin
      //11468
      try {
        this.fb.saveCheckin(id).then(() => {
          //unshift inserts at the beging of an array
          this.success.unshift(this.members[id].fullName);
        });
      } catch (err) {
        alert(err);
      }
    } else {
      //raise error
      this.errorText = `id:${id}   member:${this.members[id]}`;
    }
  }
}
