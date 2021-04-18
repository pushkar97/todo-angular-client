import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserDto } from './UserDto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  host = environment.host;
  baseUrl = `${this.host}api/login`;

  private userDetailSource: BehaviorSubject<UserDto>;

  userDetail$: Observable<UserDto>;

  private headers =  new HttpHeaders({'Content-Type': 'application/json'});

  get currentUser(): UserDto {
    return this.userDetailSource.value;
  }

  constructor(private http: HttpClient,
              private router: Router) {
                  // tslint:disable-next-line: max-line-length
                  const user = localStorage.getItem('user') as string;
                  this.userDetailSource = new BehaviorSubject<UserDto>(JSON.parse(user));
                  this.userDetail$ = this.userDetailSource.asObservable();
              }

  login(username: string, password: string): Observable<UserDto> {
    return this.http.post(this.baseUrl, {username, password}, {responseType: 'text', headers: this.headers})
      .pipe(
        map(s => {
          const username = s.split(' ')[0];
          const token = 'Bearer ' + s.split(' ')[1];
          const user: UserDto = {username, token};
          localStorage.setItem('user', JSON.stringify(user));
          this.userDetailSource.next(user);
          return user;
        })
      );
  }

  logOut(): void {
    this.userDetailSource.next(null as unknown as UserDto);
    localStorage.setItem('user', null as unknown as string);
  }
}
