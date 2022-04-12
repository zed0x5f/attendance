import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/app/service/user';

export type CreateUserRequest = {
  displayName: string;
  password: string;
  email: string;
  role: string;
};
export type UpdateUserRequest = { uid: string } & CreateUserRequest;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  get users$(): Observable<User[]> {
    return this.http
      .get<{ users: User[] }>(`${environment.baseUrl}/users`)
      .pipe(
        map((result: { users: User[] }) => {
          return result.users;
        })
      );
  }

  user$(id: string): Observable<User> {
    return this.http
      .get<{ user: User }>(`${environment.baseUrl}/users/${id}`)
      .pipe(
        map((result: { user: User }) => {
          return result.user;
        })
      );
  }

  create(user: CreateUserRequest) {
    return this.http.post(`${environment.baseUrl}/users`, user);
  }

  edit(user: UpdateUserRequest) {
    return this.http.patch(`${environment.baseUrl}/users/${user.uid}`, user);
  }
}
