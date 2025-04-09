export interface Product {
    _id?: string; // Optional because it may not be present when creating a new product
    name?: string;
    description?: string;
    price?: string;
    category?: string;
    imagePath?: string;
    barcodePath?: string;
    stock?: number;
    startsAt?: Date;
    endsAt?: Date;  
    createdAt?: Date;
  }