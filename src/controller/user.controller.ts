import { Request, Response } from 'express';
import { UserService } from '../services/user.services';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await this.userService.findUserById(id);

      res.json(response);
    } catch (error) {
      console.log('error --> ', error);
      res.status(500).json({
        status: 'Something went wrong',
        message: 'Something went wrong',
      });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const response = await this.userService.findUserByEmail(email);

      res.json(response);
    } catch (error) {
      console.log('error --> ', error);
      res.status(500).json({
        status: 'Something went wrong',
        message: 'Something went wrong',
      });
    }
  }

  async getUserBooks(req: Request, res: Response) {
    console.log('\n\n\ngetting books for user with id --> ', req.params.id);

    try {
      const userId = parseInt(req.params.id);
      const response = await this.userService.getUserBooks(userId);

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
