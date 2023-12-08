import { Request, Response } from 'express';
import { BookController } from '../controller/book.controller';
import { AuthController } from '../controller/auth.controllers';
import validate from '../validation/validate';
import { createBookSchema } from '../validation/validation.schema';
import BaseRoutes from './base/base.router';

class Routes extends BaseRoutes {
  private bookController: BookController;
  private authController: AuthController;

  constructor() {
    super();
    this.bookController = new BookController();
    this.authController = new AuthController();
    this.routes();
  }

  public routes(): void {
    this.router.post(
      '/books',
      validate(createBookSchema),
      (req: Request, res: Response) => this.bookController.create(req, res)
    );

    this.router.get('/books', (req: Request, res: Response) =>
      this.bookController.findAll(req, res)
    );
    this.router.get('/books/:id', (req: Request, res: Response) =>
      this.bookController.findById(req, res)
    );

    this.router.post('/books/purchase/:id', (req: Request, res: Response) =>
      this.bookController.buyBook(req, res)
    );

    {
      /** <----- Auth Routes -----> */
    }
    this.router.post('/user/signup', (req: Request, res: Response) =>
      this.authController.signup(req, res)
    );
    this.router.post('/user/login', (req: Request, res: Response) =>
      this.authController.signin(req, res)
    );
  }
}

export default new Routes().router;
