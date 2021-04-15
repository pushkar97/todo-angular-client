import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public token?: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkB0ZXN0LmNvbSIsIkF1dGhvcml0aWVzIjpbIkFETUlOIl0sImV4cCI6MTYxODUwNTk3NX0.uUxSitaGQI_1ZJaOszv7IFpG3r9nO4zPRM_G7lF6Gi4D-cP5xf7KMaoPx0d9O7vaCHdY7ssYntj8OOEb0hQLow';

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
