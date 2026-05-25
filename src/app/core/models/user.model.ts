export type UserRole =
  | 'admin'
  | 'customer'
  | 'seller';

export interface User {

  readonly id: string;

  name: string;

  email: string;

  password: string;

  role: UserRole;
}