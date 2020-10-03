// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';

// Product Size
export type ProductSize = 'M' | 'L' | 'XL';

// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Ram Size
export type ProductRamSizes = '2GB' | '4GB' | '8GB' | '16GB' | '32GB' | '64GB';

// Product
export interface Product {
  id?: string;
  prod_id?: string;
  prod_code?:string;
  prod_brand_id?:string;
  prod_cat_id?:string;
  prod_available_cities?: string;
  prod_status?: string;
  prod_name?: string;
  prod_qty?:number;
  prod_price?: string;
  prod_img?;
  prod_description?: string;
  prod_ram?: string;
  prod_disktype?: string; 
  prod_disksize?: string;
  prod_specification?: string;
  prod_processor?: string; 
  prod_screensize?: string;
  prod_tenure?: string;
  prod_featured?:string;
  prod_bestseller?:string;
  prod_newproducts?:string;
  brand_id?: string;
  brand_name?: string;
  brand_description?: string;
  brand_image?: string;
  cat_id?: string;
  cat_name?: string;
  cat_desc?: string;
  cat_image?: string;
  prod_tags?;

  price?: number;
  salePrice?: number;
  discount?: number;
  prod_image?: string;
  tenure_price?;
  shortDetails?: string;
  description?: string;
  stock?: number;
  new?: boolean;
  sale?: boolean;
  category?: string;
  colors?: ProductColor[];
  size?: ProductTags[];
  tags?: ProductSize[];
  variants?: any[];
}

// Color Filter
export interface ColorFilter {
  color?: ProductColor;
}

// Tag Filter
export interface TagFilter {
  tag?: ProductTags
}