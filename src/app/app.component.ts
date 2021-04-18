import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from './account/UserDto';
import { UsersService } from './account/users.service';
import { TasksService } from './tasks/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUser?: UserDto;

  constructor(private userService: UsersService,
              private router: Router,
              private taskService: TasksService){
                this.userService.userDetail$.subscribe(user => this.currentUser = user);
  }

  title = 'TODO';

  ngOnInit(): void {

  }

  logout(): void {
    this.userService.logOut();
    this.router.navigateByUrl('/login');
  }
}
