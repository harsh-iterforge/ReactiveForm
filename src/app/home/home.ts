import { AuthService } from './../auth/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  user: any;
  nameForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');

    if (!storedUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = JSON.parse(storedUser);
    this.nameForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
    });
  }
  updateName() {
    if (this.nameForm.invalid) return;

    const { firstName, lastName } = this.nameForm.value;

    this.auth.updateUser(this.user.id, { firstName, lastName }).subscribe((updatedUser: any) => {
      this.auth.setUser(updatedUser); // 🔥 updates everywhere
      this.user = updatedUser;
      this.nameForm.reset({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      });
    });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
