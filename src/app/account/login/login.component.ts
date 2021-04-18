import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  returnUrl?: string;
  constructor(private fb: FormBuilder,
              private userService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
               }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  login(): void{
    this.userService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .subscribe(
        d => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
