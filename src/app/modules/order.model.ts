import { Schema, model } from 'mongoose';
import {TOrder } from './order/order.interface';
import { ProductModel } from './product.model';



const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});



orderSchema.pre<TOrder>('save', async function (next) {
  try {
    const product = await ProductModel.findById(this.productId);
    console.log(product);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.inventory.quantity < this.quantity) {
      throw new Error('Insufficient quantity available in inventory');
    }
    // Deduct the ordered quantity from inventory
    product.inventory.quantity -= this.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    // Save the changes to product's inventory
    await product.save();
    next();
  } catch (error: any) {
    
    next(error);
  }
});

export const OrderModel = model<TOrder>('order', orderSchema);
