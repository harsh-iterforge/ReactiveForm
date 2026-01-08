import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  submitted = false;
  loginForm;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const user = localStorage.getItem('loggedInUser');

    if (user) {
      this.router.navigate(['/home']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.auth.login(email!, password!).subscribe((users) => {
      if (users.length) {
        localStorage.setItem('loggedInUser', JSON.stringify(users[0]));
        this.router.navigate(['/home']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
