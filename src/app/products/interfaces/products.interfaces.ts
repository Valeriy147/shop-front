export interface IProduct {
  id?: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  fullDescription?: string;
  year?: number;
  image?: string | File;
  createdAt?: string;
  updatedAt?: string;
}

export interface IErrors {
  key: string[];
}

export interface IPhoto {
  fileName: string;
}

export interface IPriceFilter {
  min: number;
  max: number;
}
