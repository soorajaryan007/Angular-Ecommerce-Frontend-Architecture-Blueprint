import { Injectable, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { Observable, map } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private router = inject(Router);

  currentUser = signal<User | null>(null);

  login(
    email: string,
    password: string
  ): Observable<User> {

    return this.http
      .get<User[]>('/mock/users.json')
      .pipe(
        map(users => {

          const user = users.find(
            u =>
              u.email === email &&
              u.password === password
          );

          if (!user) {

            throw new Error(
              'Invalid credentials'
            );
          }

          localStorage.setItem(
            'user',
            JSON.stringify(user)
          );

          this.currentUser.set(user);

          return user;
        })
      );
  }

  register(user: User): void {

    console.log(
      'Mock register:',
      user
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