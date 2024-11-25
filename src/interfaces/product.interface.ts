export interface Product {
  id : string
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  //TODO: type: ValidType;
  gender: "men" | "women" | "kid" | "unisex";
}

export interface CartProduct{
  id:string
  slug:string
  title:string
  quantity: number
  price: number
  size: Size
  image: string

}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidType = "shirts" | "pants" | "hoodies" | "hats";
export type categories = "men" | "women" | "kid" | "unisex";
