import type { IPost } from './Post';

export interface SearchResult extends IPost {
  productName: string;
  productDescription: string;
  oldPrice: number;
  newPrice: number;
  oldQuantity: number;
  newQuantity: number;
}