import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public token?: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyQHRlc3QuY29tIiwiQXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJleHAiOjE2MTg0NjY3ODh9.nzrR3dDnBJ-xPe2enbBsCeDUQAQVUtKi3iFFnhRF2gM_hu52YYMrBah5R8OsL8GSpGCXC75Xe494y6gU7TXwgg';

  constructor() { }

  // login(username: string, password: string): void {
  //   if (username === 'admin'){
  //     this.token = 'test-token-admin';
  //   }
  //   if (username === 'user'){
  //     this.token = 'test-token-admin';
  //   }
  // }
}
