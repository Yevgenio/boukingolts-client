export interface Memo {
    _id?: string; // Optional because it may not be present when creating a new product
    name?: string;
    description?: string;

    type?: 'product' | 'event' | 'external' | 'blog', // Enumerated options
    targetId?: string,
    externalLink?: string,
    immediateRedirect?: Boolean,

    imagePath?: string;
    startsAt?: Date;
    endsAt?: Date;  
    createdAt?: Date;
  }