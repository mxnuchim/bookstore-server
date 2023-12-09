import { Request, Response } from 'express';
import { BookController } from '../controller/book.controller';
import { AuthController } from '../controller/auth.controllers';
import validate from '../validation/validate';
import {
  createBookSchema,
  createUserSchema,
} from '../validation/validation.schema';
import BaseRoutes from './base/base.router';
import { UserController } from '../controller/user.controller';

class Routes extends BaseRoutes {
  private bookController: BookController;
  private authController: AuthController;
  private userController: UserController;

  constructor() {
    super();
    this.bookController = new BookController();
    this.authController = new AuthController();
    this.userController = new UserController();
    this.routes();
  }

  public routes(): void {
    /**
     * @swagger
     * tags:
     *   name: Books
     *   description: API endpoints for managing books
     */

    /**
     * @swagger
     * /books:
     *   post:
     *     summary: Create a new book
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateBook'
     *     responses:
     *       201:
     *         description: Book created successfully
     *       400:
     *         description: Bad request, invalid input
     *       500:
     *         description: Internal Server Error
     */
    this.router.post(
      '/books',
      validate(createBookSchema),
      (req: Request, res: Response) => this.bookController.create(req, res)
    );

    this.router.post('/books-multiple', (req: Request, res: Response) =>
      this.bookController.createMultiple(req, res)
    );

    /**
     * @swagger
     * /books:
     *   get:
     *     summary: Get all books
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               status: Ok!
     *               message: Successfully fetched all book data!
     *               data: []
     *       500:
     *         description: Internal Server Error
     */
    this.router.get('/books', (req: Request, res: Response) =>
      this.bookController.findAll(req, res)
    );

    /**
     * @swagger
     * /books/{id}:
     *   get:
     *     summary: Get a book by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the book to retrieve
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               status: Ok!
     *               message: Successfully fetched book by id!
     *               data: {}
     *       404:
     *         description: Book not found with the specified ID
     *       500:
     *         description: Internal Server Error
     */
    this.router.get('/books/:id', (req: Request, res: Response) =>
      this.bookController.findById(req, res)
    );

    /**
     * @swagger
     * /books/purchase/{id}:
     *   post:
     *     summary: Purchase a book
     *     description: This endpoint allows users to purchase a book.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/PurchaseBook'
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the book to purchase
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               status: Ok!
     *               message: Successfully purchased book!
     *       404:
     *         description: Book not found with the specified ID
     *       500:
     *         description: Internal Server Error
     */
    this.router.post('/books/purchase/:id', (req: Request, res: Response) =>
      this.bookController.buyBook(req, res)
    );

    /**
     * @swagger
     * tags:
     *   name: Authentication
     *   description: API endpoints for user authentication
     */

    /**
     * @swagger
     * /user/signup:
     *   post:
     *     summary: Signup a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserSignup'
     *     responses:
     *       201:
     *         description: User signed up successfully
     *       400:
     *         description: Bad request, invalid input
     *       500:
     *         description: Internal Server Error
     */
    this.router.post(
      '/user/signup',
      validate(createUserSchema),
      (req: Request, res: Response) => this.authController.signup(req, res)
    );

    /**
     * @swagger
     * /user/login:
     *   post:
     *     summary: Login an existing user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserLogin'
     *     responses:
     *       200:
     *         description: User logged in successfully
     *       401:
     *         description: Unauthorized, invalid credentials
     *       500:
     *         description: Internal Server Error
     */
    this.router.post('/user/login', (req: Request, res: Response) =>
      this.authController.signin(req, res)
    );

    /**
     * @swagger
     * tags:
     *   name: User
     *   description: API endpoints for user management
     */

    /**
     * @swagger
     * /user/{id}/books:
     *   get:
     *     summary: Get books owned by a user
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the user
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               status: Ok!
     *               message: Successfully fetched books owned by the user!
     *               data: []
     *       404:
     *         description: User not found with the specified ID
     *       500:
     *         description: Internal Server Error
     */
    this.router.get('/user/:id/books', (req: Request, res: Response) =>
      this.userController.getUserBooks(req, res)
    );

    /**
     * @swagger
     * /user/profile/{id}:
     *   get:
     *     summary: Get user profile by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the user
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               status: Ok!
     *               message: Successfully fetched user profile by ID!
     *               data: {}
     *       404:
     *         description: User not found with the specified ID
     *       500:
     *         description: Internal Server Error
     */
    this.router.get('/user/profile/:id', (req: Request, res: Response) =>
      this.userController.getUserById(req, res)
    );
  }
}

export default new Routes().router;
