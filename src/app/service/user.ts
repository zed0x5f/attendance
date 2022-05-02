export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  role?: Roles;
}

export enum Roles {
  Admin = 'admin',
  Manager = 'manager',
  Console = 'console',
}
