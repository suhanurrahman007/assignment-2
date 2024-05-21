import { Model } from "mongoose";

export type TVariant = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
  isDeleted: boolean;
};

// export interface ProductModels extends Model<TProduct> {
//   isExistsProduct(id: string) : Promise<TProduct | null>;
// }
