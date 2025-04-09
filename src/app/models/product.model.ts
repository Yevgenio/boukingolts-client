export interface Product {
    _id?: string; // Optional because it may not be present when creating a new product
    name?: string;
    description?: string;
    price?: string;
    category?: string;
    images?: {
      url: string;         // URL to the image
      public_id?: string;  // Optional: used for services like Cloudinary
    }[];
    imagePath?: string;
    barcodePath?: string;
    stock?: number;
    startsAt?: Date;
    endsAt?: Date;  
    createdAt?: Date;
  }