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
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app;
  db;
  constructor(private http: HttpClient) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
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
}
