import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './account/users.service';
import { TasksService } from './tasks/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn = false;

  constructor(private userService: UsersService,
              private router: Router,
              private taskService: TasksService){

  }

  title = 'TODO';

  ngOnInit(): void {
    this.userService.userDetail$.subscribe(t => {
      this.isLoggedIn = Boolean(t.username);
    });
    if (!this.isLoggedIn){
      this.router.navigateByUrl('/login');
    }
  }

  logout(): void {
    this.userService.logOut();
    this.router.navigateByUrl('/login');
  }
}
