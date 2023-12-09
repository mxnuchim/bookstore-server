import Book from '../entity/book.entity';

interface IBookRepository {
  save(book: Book): Promise<Book | null>;
  delete(bookId: number): Promise<void | null>;
  retrieveById(bookId: number): Promise<Book | null>;
  retrieveAll(): Promise<Book[] | null>;
}

export class BookRepository implements IBookRepository {
  async save(book: Book): Promise<Book | null> {
    try {
      const new_book: Book = await Book.create({
        title: book.title,
        writer: book.writer,
        cover_image: book.cover_image,
        price: book.price,
        tags: book.tags,
        owner: book.owner,
      });
      if (!Boolean(new_book)) {
        return null;
      }
      return new_book;
    } catch (error) {
      console.log('error --> ', error);
      throw new Error('Failed to create book!');
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
      console.log('error --> ', error);
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
      console.log('error --> ', error);
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
      console.log('error --> ', error);
      throw new Error('Failed to create book!');
    }
  }
}
