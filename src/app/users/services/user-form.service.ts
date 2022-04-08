import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  behaviorSubject = new BehaviorSubject({ title: '', user: {} });

  edit(user: any) {
    this.behaviorSubject.next({ title: 'Edit User', user });
  }

  create() {
    this.behaviorSubject.next({ title: 'Create User', user: {} });
  }

  get title$() {
    return this.behaviorSubject.asObservable().pipe(map((uf) => uf.title));
  }

  get user$() {
    return this.behaviorSubject.asObservable().pipe(map((uf) => uf.user));
  }
}
