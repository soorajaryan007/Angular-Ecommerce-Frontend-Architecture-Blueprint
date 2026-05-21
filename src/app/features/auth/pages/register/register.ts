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

import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-register',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './register.html',

  styleUrl: './register.scss'
})
export class Register {

  private fb = inject(FormBuilder);

  private authService =
    inject(AuthService);

  private router =
    inject(Router);

  errorMessage = '';

  registerForm = this.fb.group({

    name: [
      '',
      [
        Validators.required
      ]
    ],

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
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    confirmPassword: [
      '',
      [
        Validators.required
      ]
    ]
  });

  onSubmit(): void {

    if (
      this.registerForm.invalid
    ) {
      return;
    }

    const password =
      this.registerForm.value.password!;

    const confirmPassword =
      this.registerForm
        .value
        .confirmPassword!;

    if (
      password !== confirmPassword
    ) {

      this.errorMessage =
        'Passwords do not match';

      return;
    }

    const user: User = {

      id:
        'USR' +
        Date.now(),

      name:
        this.registerForm
          .value
          .name!,

      email:
        this.registerForm
          .value
          .email!,

      password,

      role: 'CUSTOMER'
    };

    this.authService
      .register(user)
      .subscribe({

        next: () => {

          this.router.navigate(
            ['/login']
          );
        },

        error: (error: any) => {

          this.errorMessage =
            error.message;
        }
      });
  }
}