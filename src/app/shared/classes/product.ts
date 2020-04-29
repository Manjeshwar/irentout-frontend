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
  name?: string;
  prod_img?;
  prod_id?: string;
  prod_name?: string;
  prod_ram?: string;
  cat_name?: string;
  brand_name?: string;
  prod_disksize?: string;
  prod_processor?: string;
  prod_screensize?: string;
  prod_disktype?: string;
  prod_available_cities?: string;
  price?: number;
  salePrice?: number;
  discount?: number;
  prod_image?: string;
  prod_price?: string;
  prod_tenure?;
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