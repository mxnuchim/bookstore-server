import Book from '../entity/book.entity';
import { UserRepository } from '../repository/user.repository';
import { IResponse } from './book.services';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findUserById(id: string): Promise<IResponse | null> {
    try {
      const user = await this.userRepository.retrieveById(id);

      if (!user) {
        return {
          status: 400,
          message: 'User not found.',
        };
      }

      return {
        status: 200,
        message: 'Successfully fetched user by id.',
        data: user,
      };
    } catch (error) {
      throw new Error('Failed to fetch user by id.');
    }
  }

  async findUserByEmail(email: string): Promise<IResponse | null> {
    try {
      const user = await this.userRepository.retrieveByEmail(email);

      if (!user) {
        return {
          status: 400,
          message: 'User not found.',
        };
      }

      return {
        status: 200,
        message: 'Successfully fetched user by email.',
        data: user,
      };
    } catch (error) {
      throw new Error('Failed to fetch user by email.');
    }
  }

  async getUserBooks(userId: number): Promise<IResponse | null> {
    try {
      const books = await this.userRepository.getUserBooks(userId);

      if (!books) {
        return {
          status: 400,
          message: 'Books not found.',
        };
      }

      return {
        status: 200,
        message: 'Successfully fetched user books.',
        data: books,
      };
    } catch (error) {
      throw new Error('Failed to retrieve user books.');
    }
  }
}
