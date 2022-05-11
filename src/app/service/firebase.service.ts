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
    console.log("app",this.app)
    this.db = getDatabase(this.app);
    this._myMembersObservable = new Observable((observer) => {
      this.memberOnValue(observer);
    });
    console.log('create observable');
    this._attendanceObservable = new Observable((observer) => {
      this.attendanceOnValue(observer);
    });
  }
  throwError(error:any){
    alert(error);
    Util.throwError(error);
  }

  fireBaseRegexTester = /\.|\*|\[|\]|\/|#|\$/;
  checkIfValid(input: string) {
    if (input == '') return false;
    return !this.fireBaseRegexTester.test(input);
  }

  autoPin(input:string){
    // let num = Number.parseInt(input);
    return input.slice(0,-4);//TODO implement check digit algo
  }

  uploadMembers(data: [] | any) {
    var upload: { [key: string]: any } = {};
    for (var i = 1; i < data.length; i++) {
      let [EntityId, lastName, firstName,PersonType,Email,Status,pin] = data[i];
      if(Status == undefined)Status='active';
      
      if(PersonType=='volunteer')pin = this.autoPin(EntityId);
      let newGuy = { 
        lastName: lastName, 
        firstName: firstName,
        personType:PersonType,
        email:Email,
        status:Status,
        pin:pin
      };
      if (this.checkIfValid(EntityId)) upload[EntityId!] = newGuy;
      else {
        //improper entity id
        console.log(EntityId);
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
      this.throwError
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
      this.throwError
    );
  }

  async saveCheckin(id: string) {
    let today = new Date();
    let path = Util.getYYYY_MM_DD(today);
    // console.log(path);
    let newPostKey = push(child(ref(this.db), `/checkin/${path}/${id}`)).key;

    const checkinRef = ref(this.db, `/checkin/${path}/${id}/${newPostKey}`);

    await set(checkinRef, today.getTime());
    console.log("finish checkin");
    return {
      time: today.getTime(),
      id: id,
    };
  }
}
