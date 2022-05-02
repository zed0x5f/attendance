import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  getDatabase,
  ref,
  onValue,
  get,
  child,
  set,
  push,
} from '@firebase/database';
import { initializeApp } from 'firebase/app';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { checkin, FireBaseListDict, Member } from '../models/types';
import { Util } from './util';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app;
  db;
  constructor() {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this._myMembersObservable = new Observable((observer) => {
      this.memberOnValue(observer);
    });
    console.log('create observable');
    this._attendanceObservable = new Observable((observer) => {
      this.attendanceOnValue(observer);
    });
  }

  fireBaseRegexTester = /\.|\*|\[|\]|\/|#|\$/;
  checkIfValid(input: string) {
    if (input == '') return false;
    return !this.fireBaseRegexTester.test(input);
  }

  uploadMembers(data: [[string, string, string]] | any) {
    var upload: { [key: string]: any } = {};
    for (var i = 1; i < data.length; i++) {
      let [entityId, lastName, firstName] = data[i];
      let newGuy = { lastName: lastName, firstName: firstName };
      if (this.checkIfValid(entityId)) upload[entityId!] = newGuy;
      else {
        //improper entity id
        console.log(entityId);
        console.log(newGuy);
      }
    }
    // console.log(upload);
    const myRef = ref(this.db, `/members/`);
    try {
      set(myRef, upload);
    } catch (err) {
      console.log(err);
    }
    //todo post to function consider placing code in cloud functions
    // return this.http.post(`${environment.baseUrl}/members`,upload);
  }

  private _myMembersObservable: Observable<FireBaseListDict<Member>>;
  public get myMembersObservable(): Observable<FireBaseListDict<Member>> {
    return this._myMembersObservable;
  }

  private memberOnValue(observer: Subscriber<FireBaseListDict<Member>>) {
    const memberRef = ref(this.db, '/members');
    onValue(
      memberRef,
      (snapshot) => {
        observer.next(snapshot.val());
      },
      Util.throwError
    );
  }

  private _attendanceObservable: Observable<checkin>; //update type with proper type
  public get attendanceObservable(): Observable<checkin> {
    return this._attendanceObservable;
  }

  private attendanceOnValue(observer: Subscriber<checkin>) {
    const attendanceRef = ref(this.db, 'checkin');
    console.log('onCheckin1');
    onValue(
      attendanceRef,
      (snapshot) => {
        console.log('onCheckin2');
        observer.next(snapshot.val());
      },
      Util.throwError
    );
  }

  async saveCheckin(id: string) {
    let today = new Date();
    let path = Util.getYYYY_MM_DD(today);
    // console.log(path);
    let newPostKey = push(child(ref(this.db), `/checkin/${path}/${id}`)).key;

    const checkinRef = ref(this.db, `/checkin/${path}/${id}/${newPostKey}`);

    await set(checkinRef, today.getTime());
    return {
      time: today.getTime(),
      id: id,
    };
  }
}
