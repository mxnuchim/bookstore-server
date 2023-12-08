import { Request, Response } from 'express';
import { AuthService } from '../services/auth.services';
import { BookService } from '../services/book.services';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async signup(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      const response = await this.authService.signup(email, name, password);

      res.json(response);
    } catch (error) {
      console.log('error --> ', error);
      res.status(500).json({
        status: 'Something went wrong',
        message: 'Something went wrong',
      });
    }
  }

  async signin(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      const response = await this.authService.login(email, password);

      res.json(response);
    } catch (error) {
      console.log('error --> ', error);
      res.status(500).json({
        status: 'Something went wrong',
        message: 'Something went wrong',
      });
    }
  }
}
