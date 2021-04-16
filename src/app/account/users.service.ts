import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  host = environment.host;
  baseUrl = `${this.host}api/login`;

  private userDetailSource = new Subject<{username: string, token: string}>();

  userDetail$ = this.userDetailSource.asObservable();

  private headers =  new HttpHeaders({
      'Content-Type': 'application/json'
    });

  constructor(private http: HttpClient,
              private router: Router) { }

  login(username: string, password: string): void {
    this.http.post(this.baseUrl, {email: username, password}, {responseType: 'text', headers: this.headers})
      .pipe(
        map(s => {
          const username1 = s.split(' ')[0];
          const token1 = 'Bearer ' + s.split(' ')[1];
          this.userDetailSource.next({username: username1, token: token1});
        }),
        catchError(
          (error: any): Observable<any> => {
            console.log(`Authentication failed: ${error.message}`);
            return of(null);
          })
      ).subscribe();
  }

  logOut(): void {
    this.userDetailSource.next({username: '', token: ''});
  }
}
