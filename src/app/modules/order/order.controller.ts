import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validate';
import { OrderServices } from './order.services';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const { error, value } = orderValidationSchema.validate(order);

    const result = await OrderServices.createOrderIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllAndEmailOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const message = email
      ? `Orders fetched successfully for user ${email}!`
      : 'Orders fetched successfully!';

    const result = await OrderServices.getAllAndSearchOrdersInDB(
      email as string,
    );

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving Orders',
      error: error,
      data: null,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllAndEmailOrder,
};
