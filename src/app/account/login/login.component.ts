import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email, Validators.maxLength(64)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]]
  });

  constructor(private fb: FormBuilder,
              private userService: UsersService) { }

  ngOnInit(): void {
  }

  login(): void{
    this.userService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);
  }

}
