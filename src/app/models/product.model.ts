export interface Product {
    _id?: string; // Optional because it may not be present when creating a new product
    name?: string;
    description?: string;
    category?: string;
    images?: {
      url: string;         // URL to the image
    }[];
    createdAt?: Date;
  }