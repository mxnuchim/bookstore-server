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
      const response = await this.bookService.createBook(
        title,
        writer,
        cover_image,
        price,
        tags
      );

      res.json(response);
    } catch (err) {
      console.log('error --> ', err);
      res.status(500).json({
        status: 'Something went wrong',
        message: 'Something went wrong',
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params['id']);
      const response = await this.bookService.findBookById(id);

      res.json(response);
    } catch (err) {
      console.log('\n\nerror --> ', err);
      res.status(500).json({
        status: 'Something went wrong',
        message: 'Something went wrong',
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const response = await this.bookService.findAllBooks();

      res.json(response);
    } catch (err) {
      console.log('error --> ', err);
      res.status(500).json({
        status: 'Something went wrong',
        message: 'Something went wrong',
      });
    }
  }

  async buyBook(req: Request, res: Response) {
    try {
      const bookId = parseInt(req.params['id']);
      const { userId } = req.body;

      const response = await this.bookService.buyBook(bookId, userId);

      res.json(response);
    } catch (error) {
      res.status(500).json({
        status: 'Something went wrong',
        message: 'Something went wrong',
      });
    }
  }
}
