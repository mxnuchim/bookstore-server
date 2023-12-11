import express, { Application, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import Database from './config/database';
import BooksRouter from './router/routes';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route('/').get((req: Request, res: Response) => {
      res.json(
        "You've reached the server. Please access the routes by adding /api suffix"
      );
    });
    this.app.route('/api').get((req: Request, res: Response) => {
      res.json(
        'Welcome to the BookStore Server. This is the root endpoint. Please feel free to explore'
      );
    });
    this.app.use(
      cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      })
    );
    this.app.use('/api', BooksRouter);

    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title:
            'BookStore API with TypeScript, Express, PostgreSQL, and Swagger',
          version: '0.1.0',
          description:
            'This is a simple Bookstore API application made with Express and documented with Swagger',
          license: {
            name: 'MIT',
            url: 'https://spdx.org/licenses/MIT.html',
          },
          contact: {
            name: 'Manuchimso Oliver',
            url: 'www.manuchim.com',
            email: 'manuchimoliver779@gmail.com',
          },
        },
        servers: [
          {
            url: 'http://ec2-3-94-190-53.compute-1.amazonaws.com:8080/api',
          },
        ],
      },
      apis: ['src/router/*.ts'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));
  }
}

const port: number = parseInt(process.env.PORT || '');
const app = new App().app;

app.listen(port, () => {
  console.log(`✅ Server started successfully on http://localhost:${port}!`);
});
