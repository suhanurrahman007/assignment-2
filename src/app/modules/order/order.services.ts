import { OrderModel } from "../order.model";
import { ProductModel } from "../product.model";
import { TOrder } from "./order.interface";

const createOrderIntoDB = async (order: TOrder) => {

    const product = await ProductModel.findById(order.productId)
    console.log(product);
    
  const result = await OrderModel.create(order);
  return result;
};

const getAllAndSearchOrdersInDB = async (email: string) => {
  try {
    if (email) {
      const result = await OrderModel.find({
        email
      });
      return result;
    } else {
      const result = await OrderModel.find();
      return result;
    }
  } catch (error) {
    throw new Error(`Unable to search Orders: ${error}`);
  }
};


export const OrderServices = {
  createOrderIntoDB,
  getAllAndSearchOrdersInDB,
};
