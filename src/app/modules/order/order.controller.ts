import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validate';
import { OrderServices } from './order.services';


const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    const { error, value } = orderValidationSchema.validate(orderData);

    const result = await OrderServices.createOrderIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong!',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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

const getAllAndSearchOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (email) {
        const result = await OrderServices.getAllAndSearchOrdersInDB(
          email as string,
        );

        const message = email
          ? `Orders matching search term '${email}' fetched successfully!`
          : 'Orders fetched successfully!';

        res.status(200).json({
          success: true,
          message,
          data: result,
        });
    } else {
        res.status(200).json({
          success: false,
          message: "No Email Here",
          data: null
        })
    }
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
  getAllAndSearchOrder,
};
