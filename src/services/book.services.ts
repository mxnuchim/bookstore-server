import { Book } from '../entity/book.entity';
import { BookRepo } from '../repository/book.repository';

export class BookService {
  private bookRepository: BookRepo;

  constructor() {
    this.bookRepository = new BookRepo();
  }

  async createBook(
    title: string,
    writer: string,
    cover_image: string,
    price: number,
    tags: Array<string>
  ): Promise<Book | null> {
    try {
      const new_book = new Book();
      new_book.title = title;
      new_book.writer = writer;
      new_book.cover_image = cover_image;
      new_book.price = price;
      new_book.tags = tags;

      const created_book = await this.bookRepository.save(new_book);
      return created_book;
    } catch (err) {
      throw new Error('Failed to create book.');
    }
  }

  async deleteBook(id: number): Promise<void> {
    try {
      await this.bookRepository.delete(id);
    } catch (err) {
      throw new Error('Failed to delete book.');
    }
  }

  async findBookById(id: number): Promise<Book | null> {
    try {
      const book = await this.bookRepository.retrieveById(id);

      if (!Boolean(book)) {
        return null;
      }
      return book;
    } catch (err) {
      throw new Error('Failed to fetch book by id.');
    }
  }

  async findAllBooks(): Promise<Book[] | null> {
    try {
      const books = await this.bookRepository.retrieveAll();

      if (!Boolean(books)) {
        return null;
      }
      return books;
    } catch (err) {
      throw new Error('Failed to fetch all books.');
    }
  }

  async updateBook(
    id: number,
    title: string,
    writer: string
  ): Promise<Book | null> {
    try {
      const updatedBook = new Book();
      updatedBook.id = id;
      updatedBook.title = title;
      updatedBook.writer = writer;

      const response = await this.bookRepository.update(updatedBook);

      return response;
    } catch (err) {
      throw new Error('Failed to update book.');
    }
  }
}
