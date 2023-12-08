import { Book } from '../entity/book.entity';
import { BookRepository } from '../repository/book.repository';
import { UserRepository } from '../repository/user.repository';

export interface IResponse {
  status: number;
  message: string;
  data?: any;
}

export class BookService {
  private bookRepository: BookRepository;
  private userRepository: UserRepository;

  constructor() {
    this.bookRepository = new BookRepository();
    this.userRepository = new UserRepository();
  }

  async createBook(
    title: string,
    writer: string,
    cover_image: string,
    price: number,
    tags: Array<string>
  ): Promise<IResponse | null> {
    try {
      if (!title || !writer || !cover_image || !price || !tags) {
        return {
          status: 400,
          message: 'All fields are required!',
        };
      }
      const new_book = new Book();
      new_book.title = title;
      new_book.writer = writer;
      new_book.cover_image = cover_image;
      new_book.price = price;
      new_book.tags = tags;

      const created_book = await this.bookRepository.save(new_book);
      if (!created_book) {
        return {
          status: 500,
          message: 'Failed to create book.',
        };
      } else {
        return {
          status: 200,
          message: 'Successfully created book.',
          data: created_book,
        };
      }
    } catch (err) {
      throw new Error('Failed to create book.');
    }
  }

  async findBookById(id: number): Promise<IResponse | null> {
    try {
      const book = await this.bookRepository.retrieveById(id);

      if (!Boolean(book)) {
        return {
          status: 400,
          message: 'Book not found.',
        };
      }
      return {
        status: 200,
        message: 'Successfully fetched book by id.',
        data: book,
      };
    } catch (err) {
      throw new Error('Failed to fetch book by id.');
    }
  }

  async findAllBooks(): Promise<IResponse | null> {
    try {
      const books = await this.bookRepository.retrieveAll();

      if (!Boolean(books)) {
        return {
          status: 400,
          message: 'Books not found.',
        };
      }
      return {
        status: 200,
        message: 'Successfully fetched all books.',
        data: books,
      };
    } catch (err) {
      console.log('\n\n\nerror --> ', err);
      throw new Error('Failed to fetch all books.');
    }
  }

  async buyBook(bookId: number, userId: number): Promise<IResponse | null> {
    try {
      const book = await this.bookRepository.retrieveById(bookId);
      if (!book) {
        return {
          status: 400,
          message: 'Book not found.',
        };
      }
      const user = await this.userRepository.retrieveByID(userId);
      if (!user) {
        return {
          status: 400,
          message: 'User not found.',
        };
      }
      if (book.price > user.balance) {
        return {
          status: 400,
          message: 'Insufficient balance.',
        };
      }
      user.balance -= book.price;
      await user.save();

      // make the book owner the id of the user
      book.owner = userId;
      await book.save();

      return {
        status: 200,
        message: 'Successfully purchased book.',
        data: book,
      };
    } catch (error) {
      console.log('error --> ', error);
      throw new Error('Failed to purchase book.');
    }
  }
}
