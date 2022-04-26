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
import { FireBaseListDict, Member } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app;
  db;
  constructor(private http: HttpClient) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this._myMembersObservable = new Observable((observer) => {
      this.memberOnValue(observer);
    });
    this._attendanceObservable = new Observable((observer)=>{
      this.attendanceOnValue(observer);
    })
  }

  regex = /\.|\*|\[|\]|\/|#|\$/;
  checkIfValid(input: string) {
    if (input == '') return false;
    return !this.regex.test(input);
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
    onValue(memberRef, (snapshot) => {
      observer.next(snapshot.val());
    });
  }

  private _attendanceObservable: Observable<FireBaseListDict<any>>;//update type with proper type
  public get attendanceObservable(): Observable<FireBaseListDict<any>> {
    return this._attendanceObservable;
  }

  private attendanceOnValue(observer:Subscriber<FireBaseListDict<any>>) { 
    const attendanceRef = ref(this.db, 'checkin');
    onValue(attendanceRef, (snapshot)=>{
      observer.next(snapshot.val());
    })
  }

  saveCheckin(id: string) {
    let today = new Date();
    //chad way to write this code
    let [year, month, day] = [
      today.getUTCFullYear(),
      today.getUTCMonth() + 1, //starts at 0
      today.getUTCDate(),
    ].map((number) => String(number));
    let path = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    console.log(path);
    let newPostKey = push(child(ref(this.db), `/checkin/${path}/${id}`)).key;

    const checkinRef = ref(this.db, `/checkin/${path}/${id}/${newPostKey}`);

    return set(checkinRef, today.getTime()).then(() => {
      return {
        time: today.getTime(),
        id: id,
      };
    });
  }
}
