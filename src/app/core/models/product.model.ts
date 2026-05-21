export interface Product {
  id: string;
  title: string;
  description?: string;

  price: number;
  discountPrice: number;

  rating: number;

  thumbnail: string;

  brand: string;

  stock: number;

  images?: string[];

  specifications?: {
    ram?: string;
    storage?: string;
  };
}