export interface Deal {
    _id?: string; // Optional because it may not be present when creating a new deal
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