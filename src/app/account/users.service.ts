import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public token?: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkB0ZXN0LmNvbSIsIkF1dGhvcml0aWVzIjpbIkFETUlOIl0sImV4cCI6MTYxODQyNTA4Nn0.kabG_0hsIOOP3nh0Ewg0QvOXMVLrTtxV4up06po9RzzWZRft64led4h3U7ZOsBjtQdAIY3BvEPHdD8qVusfjfg';

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
