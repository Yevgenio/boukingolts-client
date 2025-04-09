export interface Chat {
    _id?: string; // Optional because it may not be present when creating a new product
    name: string;
    description: string;
    link: string;
    category: String;
    imagePath: string;
  }