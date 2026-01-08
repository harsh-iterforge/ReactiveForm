import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000/users';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  register(data: any) {
    return this.http.post(this.API, data);
  }

  login(email: string, password: string) {
    return this.http.get<any[]>(`${this.API}?email=${email}&password=${password}`);
  }
  setUser(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.userSubject.next(user);
  }

  // 🔥 get current user synchronously
  getUser() {
    return this.userSubject.value;
  }
  updateUser(id: number, data: any) {
    return this.http.patch(`${this.API}/${id}`, data);
  }
  logout() {
    localStorage.removeItem('loggedInUser');
    this.userSubject.next(null);
  }
}
