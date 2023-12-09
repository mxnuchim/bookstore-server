import Book from '../entity/book.entity';
import { User } from '../entity/user.entity';

interface IUserRepository {
  save(user: User): Promise<User | null>;
  update(user: User): Promise<User | null>;
  delete(userId: number): Promise<void | null>;
  createUser(
    email: string,
    name: string,
    password: string
  ): Promise<User | null>;
  retrieveByEmail(email: string): Promise<User | null>;
  retrieveById(id: string): Promise<User | null>;
  retrieveAll(): Promise<User[] | null>;
  getUserBooks(userId: number): Promise<Book[] | null>;
}

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<User | null> {
    try {
      const newUser: User = await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
        balance: user.balance,
      });

      if (!newUser) {
        return null;
      }

      return newUser;
    } catch (error) {
      throw new Error('Failed to create user!');
    }
  }

  async update(user: User): Promise<User | null> {
    try {
      const existingUser = await User.findOne({
        where: {
          id: user.id,
        },
      });

      if (!existingUser) {
        return null;
      }

      existingUser.name = user.name;
      existingUser.email = user.email;
      existingUser.password = user.password;
      existingUser.balance = user.balance;

      const updatedUser = await existingUser.save();
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user!');
    }
  }

  async delete(userId: number): Promise<void | null> {
    try {
      const userToDelete = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!userToDelete) {
        return null;
      }

      await userToDelete.destroy();
    } catch (error) {
      throw new Error('Failed to delete user!');
    }
  }

  async retrieveByEmail(email: string): Promise<User | null> {
    try {
      const foundUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!foundUser) {
        return null;
      }

      return foundUser;
    } catch (error) {
      throw new Error('Failed to retrieve user by email!');
    }
  }

  async retrieveById(id: string): Promise<User | null> {
    try {
      const foundUser = await User.findOne({
        where: {
          id: id,
        },
      });

      if (!foundUser) {
        return null;
      }

      return foundUser;
    } catch (error) {
      throw new Error('Failed to retrieve user by email!');
    }
  }

  async retrieveByID(id: number): Promise<User | null> {
    try {
      const foundUser = await User.findOne({
        where: {
          id: id,
        },
      });

      if (!foundUser) {
        return null;
      }

      return foundUser;
    } catch (error) {
      throw new Error('Failed to retrieve user by email!');
    }
  }

  async retrieveAll(): Promise<User[] | null> {
    try {
      const users = await User.findAll();

      if (!users) {
        return null;
      }

      return users;
    } catch (error) {
      throw new Error('Failed to retrieve all users!');
    }
  }

  async createUser(
    email: string,
    name: string,
    password: string
  ): Promise<User | null> {
    try {
      const newUser = await User.create({
        email: email,
        name: name,
        password: password,
      });
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user.');
    }
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const user = await this.retrieveByEmail(email);

      if (!user) {
        return null;
      }

      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await user.comparePassword(password);

      if (passwordMatch) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Failed to authenticate user.');
    }
  }

  async getUserBooks(userId: number): Promise<Book[] | null> {
    try {
      const user = await User.findOne({
        where: { id: userId },
      });

      if (!user) {
        return null;
      }

      // Access the books associated with the user
      const books = await Book.findAll({
        where: { owner: userId },
      });

      if (!books) {
        return null;
      }

      return books;
    } catch (error) {
      throw new Error('Failed to retrieve user books.');
    }
  }
}
