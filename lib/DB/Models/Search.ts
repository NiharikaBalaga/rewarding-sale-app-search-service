import { IPost } from "./Post";

export interface SearchResult extends IPost{
    // Define the structure of your search result here
    productName: string;
    productDescription : string;
    oldPrice: number;
    newPrice: number;
    oldQuantity: number;
    newQuantity: number;
}