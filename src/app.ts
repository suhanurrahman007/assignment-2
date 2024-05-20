import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/products', ProductRoutes)

const getController = (req: Request, res: Response) => {
  const a = 12;
  res.send(a);
};

app.get('/', getController);

export default app;
