export class UserEntity {
  id: number;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  Administrator = 0,
  Client = 1
}
