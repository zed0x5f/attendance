import { Injectable } from '@angular/core';
import {
  getDatabase,
  ref,
  onValue,
  get,
  child,
  set,
  update,
  push,
} from '@firebase/database';
import { initializeApp } from 'firebase/app';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Checkin,
  FireBaseListDict,
  Member,
  Reservations,
} from '../models/types';
import { Util } from './util';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  //TODO: ues multicasting currently the observables are cold
  //https://rxjs.dev/deprecations/multicasting
  //that would fix some issues with recalling the same data

  app;
  db;
  constructor() {
    this.app = initializeApp(environment.firebase);
    console.log('app', this.app);
    this.db = getDatabase(this.app);
    //TODO these are too cold
    this._myMembersObservable = new Observable((observer) => {
      this.memberOnValue(observer);
    });
    console.log('create observable');
    this._attendanceObservable = new Observable((observer) => {
      this.attendanceOnValue(observer);
    });
    this._reservationsObservable = new Observable((observer) => {
      this.reservationOnValue(observer);
    });
  }
  throwError(error: any) {
    alert(error);
    Util.throwError(error);
  }

  fireBaseRegexTester = /\.|\*|\[|\]|\/|#|\$/;
  checkIfValid(input: string) {
    if (input == '') return false;
    return !this.fireBaseRegexTester.test(input);
  }

  autoPin(input: string) {
    // let num = Number.parseInt(input);
    return input.slice(input.length - 4); //TODO implement check digit algo
  }

  uploadReservations(data: string[][]) {
    let upload: any = {};
    data.forEach((row: any) => {
      let [RegistrationId, date, Breakfast, Lunch, Dinner] = row;

      let toNum = (a: string) => parseInt(a);
      try {
        Breakfast = toNum(Breakfast);
        Lunch = toNum(Lunch);
        Dinner = toNum(Dinner);
      } catch (err) {
        alert('problem with ' + JSON.stringify(row));
        console.log(err, JSON.stringify(row));
        return;
      }
      // date = new Date(date);
      upload[Util.getYYYY_MM_DD(date)][RegistrationId] = {
        b: Breakfast,
        l: Lunch,
        d: Dinner,
      };
    });
    const myRef = ref(this.db, `/reservations/`);
    try {
      console.log('upload', upload);
      if (upload && Object.keys(upload).length !== 0) update(myRef, upload);
    } catch (err) {
      console.log(err);
    }
  }

  uploadMembers(data: string[][]) {
    // console.log('data', data);
    var upload: { [key: string]: any } = {};
    data.forEach((d: any) => {
      let [EntityId, lastName, firstName, PersonType, Email, Status, pin] = d;
      if (Status == undefined || Status == '') Status = 'active';

      if (PersonType == 'volunteer') pin = this.autoPin(EntityId);
      if (pin == undefined || pin == null || pin == '')
        pin = this.autoPin(EntityId);
      let newGuy = {
        lastName: lastName,
        firstName: firstName,
        personType: PersonType,
        email: Email,
        status: Status,
        pin: pin,
      };
      if (this.checkIfValid(EntityId)) {
        upload[EntityId!] = newGuy;
      } else {
        //improper entity id\
        console.log('impoper id');
        console.log(EntityId);
        console.log(newGuy);
      }
    });
    // console.log(upload);
    const myRef = ref(this.db, `/members/`);
    try {
      console.log('upload', upload);
      if (upload && Object.keys(upload).length !== 0) update(myRef, upload);
    } catch (err) {
      console.log(err);
    }
  }

  saveMember(key: string, upload: Member) {
    const myRef = ref(this.db, `/members/${key}`);
    try {
      console.log('upload', upload, 'key', key);
      if (upload && Object.keys(upload).length !== 0) update(myRef, upload);
    } catch (err) {
      console.log(err);
    }
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

  private _attendanceObservable: Observable<Checkin>;
  public get attendanceObservable(): Observable<Checkin> {
    return this._attendanceObservable;
  }

  private attendanceOnValue(observer: Subscriber<Checkin>) {
    const checkinRef = ref(this.db, 'checkin');
    // console.log('onCheckin1');
    onValue(
      checkinRef,
      (snapshot) => {
        // console.log('onCheckin2');
        observer.next(snapshot.val());
        let v: Checkin = snapshot.val();
        // console.log(v);
        return;//todo fix fix later
        
        let upload: any = {};
        for (const [dateKey, memberList] of Object.entries(v)) {
          for (const [memberId, listOfTime] of Object.entries(memberList)) {
            for (const [key2, timeStamp] of Object.entries(listOfTime)) {
              if (Util.getDateYYYY_MM_DD(dateKey) != new Date(timeStamp)) {
                console.log('error');
                upload[Util.getYYYY_MM_DD(new Date(timeStamp))][memberId][
                  key2
                ] = timeStamp;
              }
            }
          }
        }
        console.log(upload);
        if (false) {
          // const ref = ref(this.db,'')
        }
      },
      this.throwError
    );
  }

  private _reservationsObservable: Observable<Reservations>;
  public get reservationsObservable(): Observable<Reservations> {
    return this._reservationsObservable;
  }

  private reservationOnValue(observer: Subscriber<Reservations>) {
    const reservationRef = ref(this.db, '/reservations/');
    onValue(
      reservationRef,
      (snapshot) => {
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
    console.log('finish checkin');
    return {
      time: today.getTime(),
      id: id,
    };
  }
}
