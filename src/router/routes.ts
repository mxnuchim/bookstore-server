import { Request, Response } from 'express';
import { BookController } from '../controller/book.controller';
import validate from '../validation/validate';
import {
  createBookSchema,
  updateBookSchema,
} from '../validation/validation.schema';
import BaseRoutes from './base/base.router';

class Routes extends BaseRoutes {
  private bookController: BookController;

  constructor() {
    super();
    this.bookController = new BookController();
    this.routes();
  }

  public routes(): void {
    this.router.post(
      '/books',
      validate(createBookSchema),
      (req: Request, res: Response) => this.bookController.create(req, res)
    );
    this.router.patch(
      '/books/:id',
      validate(updateBookSchema),
      (req: Request, res: Response) => this.bookController.update(req, res)
    );
    this.router.get('/books', (req: Request, res: Response) =>
      this.bookController.findAll(req, res)
    );
    this.router.get('/books/:id', (req: Request, res: Response) =>
      this.bookController.findById(req, res)
    );
  }
}

export default new Routes().router;
