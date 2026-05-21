import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import {
  Observable,
  map,
  tap
} from 'rxjs';

import { User } from '../models/user.model';

import { environment }
from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);

  private http = inject(HttpClient);

  currentUser =
    signal<User | null>(null);

  constructor() {

    this.loadUserFromStorage();
  }

  register(
    user: User
  ): Observable<User> {

    return this.http.post<User>(
      `${environment.apiBaseUrl}/users`,
      user
    );
  }

  login(
    email: string,
    password: string
  ): Observable<User> {

    return this.http
      .get<User[]>(
        `${environment.apiBaseUrl}/users?email=${email}`
      )
      .pipe(

        map(users => {

          const user = users.find(
            u => u.password === password
          );

          if (!user) {

            throw new Error(
              'Invalid credentials'
            );
          }

          return user;
        }),

        tap(user => {

          localStorage.setItem(
            'user',
            JSON.stringify(user)
          );

          this.currentUser.set(user);
        })
      );
  }

  logout(): void {

    localStorage.removeItem('user');

    this.currentUser.set(null);

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('user');
  }

  loadUserFromStorage(): void {

    const user =
      localStorage.getItem('user');

    if (user) {

      this.currentUser.set(
        JSON.parse(user)
      );
    }
  }
}