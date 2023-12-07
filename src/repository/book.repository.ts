import { Book } from '../entity/book.entity';

interface IBookRepo {
  save(book: Book): Promise<Book | null>;
  update(book: Book): Promise<Book | null>;
  delete(bookId: number): Promise<void | null>;
  retrieveById(bookId: number): Promise<Book | null>;
  retrieveAll(): Promise<Book[] | null>;
}

export class BookRepo implements IBookRepo {
  async save(book: Book): Promise<Book | null> {
    try {
      const new_book: Book = await Book.create({
        title: book.title,
        writer: book.writer,
        cover_image: book.cover_image,
        price: book.price,
        tags: book.tags,
      });
      if (!Boolean(new_book)) {
        return null;
      }
      return new_book;
    } catch (error) {
      throw new Error('Failed to create note!');
    }
  }
  async update(book: Book): Promise<Book | null> {
    try {
      const new_book = await Book.findOne({
        where: {
          id: book.id,
        },
      });
      if (!new_book) {
        return null;
      }
      (new_book.title = book.title),
        (new_book.writer = book.writer),
        (new_book.cover_image = book.cover_image),
        (new_book.price = book.price),
        (new_book.tags = book.tags);

      const saved_book = await new_book.save();
      return saved_book;
    } catch (error) {
      throw new Error('Failed to create note!');
    }
  }
  async delete(bookId: number): Promise<void | null> {
    try {
      const new_book = await Book.findOne({
        where: {
          id: bookId,
        },
      });
      if (!new_book) {
        return null;
      }
      await new_book.destroy();
    } catch (error) {
      throw new Error('Failed to delete book!');
    }
  }
  async retrieveById(bookId: number): Promise<Book | null> {
    try {
      const new_book = await Book.findOne({
        where: {
          id: bookId,
        },
      });
      if (!new_book) {
        return null;
      }
      return new_book;
    } catch (error) {
      throw new Error('Failed to create book!');
    }
  }
  async retrieveAll(): Promise<Book[] | null> {
    try {
      const books = await Book.findAll();

      if (!Boolean(books)) {
        return null;
      }
      return books;
    } catch (error) {
      throw new Error('Failed to create note!');
    }
  }
}
