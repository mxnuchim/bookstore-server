// src/services/user.service.ts

import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { IResponse } from './book.services';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(
    email: string,
    name: string,
    password: string
  ): Promise<IResponse | null> {
    try {
      // Check if the user already exists
      const existingUser = await this.userRepository.retrieveByEmail(email);

      if (existingUser) {
        return {
          status: 400,
          message: 'User already exists.',
        };
      }
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userRepository.createUser(
        email,
        name,
        hashedPassword
      );
      return {
        status: 200,
        message: 'User created successfully.',
        data: newUser,
      };
    } catch (err) {
      throw new Error('Failed to signup user.');
    }
  }

  async login(email: string, password: string): Promise<IResponse | null> {
    try {
      if (!email || !password) {
        return {
          status: 400,
          message: 'All fields are required!',
        };
      }
      const user = await this.userRepository.retrieveByEmail(email);
      if (!user) {
        return {
          status: 400,
          message: 'User not found.',
        };
      }
      // compare passwords
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return {
          status: 400,
          message: 'Invalid credentials.',
        };
      }
      return {
        status: 200,
        message: 'User logged in successfully.',
        data: user,
      };
    } catch (err) {
      throw new Error('Failed to login user.');
    }
  }
}
