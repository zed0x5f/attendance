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
  constructor() {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
  }
  checkIfValid(input:string){
    if(input == "")
      return false;
    if(input)
      return false;
      return true;
  }

  uploadMembers(data: [[string, string, string]] | any) {
    const myRef = ref(this.db, `/users/`);
    var upload: { [key: string]: any } = {};
    for (var i = 1; i < data.length; i++) {
      let [entityId, lastName, firstName] = data[i];
      if (entityId != '' || entityId != undefined)
        upload[entityId!] = { lastName: lastName, firstName: firstName };
    }
    console.log(upload);
    // set(myRef,upload);
  }
}