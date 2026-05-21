import {
  Component,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './login.html',

  styleUrl: './login.scss'
})
export class Login {

  private fb = inject(FormBuilder);

  private authService =
    inject(AuthService);

  private router =
    inject(Router);

  errorMessage = '';

  loginForm = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required
      ]
    ]
  });

  onSubmit(): void {

    if (
      this.loginForm.invalid
    ) {
      return;
    }

    this.authService
      .login(

        this.loginForm
          .value
          .email!,

        this.loginForm
          .value
          .password!
      )
      .subscribe({

        next: () => {

          this.router.navigate(
            ['/products']
          );
        },

        error: (error: any) => {

          this.errorMessage =
            error.message;
        }
      });
  }
}