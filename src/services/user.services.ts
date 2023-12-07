// src/services/user.service.ts

import { User } from '../entity/user.entity';
import { UserRepo } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';

export class UserService {
  private userRepo: UserRepo;

  constructor() {
    this.userRepo = new UserRepo();
  }

  async signup(
    email: string,
    name: string,
    password: string
  ): Promise<User | null> {
    try {
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userRepo.createUser(
        email,
        name,
        hashedPassword
      );
      return newUser;
    } catch (err) {
      throw new Error('Failed to signup user.');
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const authenticatedUser = await this.userRepo.authenticateUser(
        email,
        password
      );
      return authenticatedUser;
    } catch (err) {
      throw new Error('Failed to login user.');
    }
  }
}
