import { Request, Response } from 'express';
import { BookService } from '../services/book.services';

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  async create(req: Request, res: Response) {
    try {
      const { title, writer, cover_image, price, tags } = req.body;
      const new_book = await this.bookService.createBook(
        title,
        writer,
        cover_image,
        price,
        tags
      );

      if (!Boolean(new_book)) {
        res.status(400).json({
          status: 'Error',
          message: 'Failed to create book',
          book: new_book,
        });
      }
      res.status(201).json({
        status: 'Created!',
        message: 'Successfully created book!',
        book: new_book,
      });
    } catch (err) {
      res.status(500).json({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params['id']);
      await this.bookService.deleteBook(id);

      res.status(200).json({
        status: 'Ok!',
        message: 'Successfully deleted book!',
      });
    } catch (err) {
      res.status(500).json({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params['id']);
      const foundBook = await this.bookService.findBookById(id);

      if (!foundBook) {
        res.status(404).json({
          status: 'Not Found!',
          message: 'Book not found with the specified id!',
        });
      } else {
        res.status(200).json({
          status: 'Ok!',
          message: 'Successfully fetched book by id!',
          data: foundBook,
        });
      }
    } catch (err) {
      console.log('\n\nerror --> ', err);
      res.status(500).json({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const allBooks = await this.bookService.findAllBooks();

      res.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetched all book data!',
        data: allBooks,
      });
    } catch (err) {
      res.status(500).json({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = parseInt(req.params['id']);
      const { title, writer } = req.body;

      const foundBook = await this.bookService.findBookById(id);

      if (foundBook) {
        await this.bookService.updateBook(id, title, writer);

        res.status(200).json({
          status: 'Ok!',
          message: 'Successfully updated book data!',
        });
      } else {
        res.status(404).json({
          status: 'Not Found!',
          message: 'Book not found with the specified id!',
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'Internal Server Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}
