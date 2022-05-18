import { Component, ElementRef, OnInit } from '@angular/core';
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
          this.members[key].key = key;
          this.members[key].fullName = value.firstName + ' ' + value.lastName;
          this.members[key].count = 0;
        } catch (err) {}
      }

      console.log(members);
    });
    this.successAudio.load();
    this.errorAudio.load();
  }

  value = '';
  lastUpdate: number = 0;
  count = 0;

  update(value: string) {
    //todo use switchmap to restart a timeout instead of a timeout function
    const delay = 460;
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

  submit(manInput: HTMLInputElement) {
    this.resultOfSearch = [];
    if (manInput.value == '' || manInput.value == undefined) return;
    //todo implement search feature
    // console.log('submit',typeof thing,thing)
    // console.log(manInput.value);
    let regEx = new RegExp(manInput.value, 'i');
    for (const [key, value] of Object.entries(this.members)) {
      if (
        regEx.test(value.fullName!) ||
        regEx.test(value.pin + '') ||
        regEx.test(value.key + '')
      ) {
        value.key = key;
        this.resultOfSearch.push(value);
      }
    }
    manInput.value = '';
  }
  resultOfSearch: Member[] = [];

  error = false;
  errorText: string = '';
  success: Member[] = [];
  successAudio = new Audio('../../../assets/sounds/sonic_ring.mp3');
  errorAudio = new Audio('../../../assets/sounds/xp_error.mp3');
  saveCheckin(id: string, index?: number) {
    if (id == '') return;
    let checkMember = (id: string): boolean => {
      return this.members[id] != undefined;
    };
    this.error = !checkMember(id);
    //todo implent this component
    console.log('checking in', id);
    if (checkMember(id)) {
      try {
          this.fb.saveCheckin(id).then((value) => {
            console.log(value);
            //unshift inserts at the beging of an array
            this.checkinSucess(id);
          });
      } catch (err) {
        alert(err);
        this.checkinError(id);
      }
    } else {
      //raise error
      this.checkinError(id);
    }
  }

  checkinError(id: string) {
    this.errorAudio.play();
    this.errorText = `id:${id}   member:${this.members[id]}`;
    this.success = this.success.filter((e) => e.key != id);
  }

  checkinSucess(id: string, index?: number) {
    this.members[id].count! += 1;
    if (index != undefined) this.resultOfSearch[index].count! += 1;
    this.successAudio.play();
    this.success.unshift(this.members[id]);
    // console.log(this.success);
  }

  closeSearchResults() {
    this.resultOfSearch = [];
  }
}
