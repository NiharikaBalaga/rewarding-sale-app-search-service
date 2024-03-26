import { SearchResult } from "../DB/Models/Search";
import type { IPost } from '../DB/Models/Post';
import PostModel from '../DB/Models/Post';

export async function searchPosts(query: string): Promise<SearchResult[]> {
    try {
        // Initialize an empty array to hold the search conditions
        const searchConditions: any[] = [];

        // Check if the query is numeric
        const parsedQuery = parseFloat(query);
        const isNumeric = !isNaN(parsedQuery);

        // If the query is numeric, search for exact matches of old price, new price, old quantity, and new quantity
        if (isNumeric) {
            searchConditions.push(
                { oldPrice: parsedQuery },
                { newPrice: parsedQuery },
                { oldQuantity: parsedQuery },
                { newQuantity: parsedQuery }
            );
        }

        // Check if the query contains a dot (.) to search for decimal part of the price
        const dotIndex = query.indexOf('.');
        if (dotIndex !== -1) {
            // If dot exists, extract the decimal part of the price
            const decimalPart = parseInt(query.substring(dotIndex + 1));
            searchConditions.push({ newPrice: decimalPart });
        }

        // Add conditions for productName and productDescription
        searchConditions.push(
            { productName: { $regex: query, $options: 'i' } }, // Case-insensitive search for product name
            { productDescription: { $regex: query, $options: 'i' } } // Case-insensitive search for product description
        );


       // Perform the search query in the Post collection
       const searchResults: IPost[] = await PostModel.find({ $or: searchConditions }).exec();

        return searchResults;
    } catch (error) {
        console.error('Error searching posts:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

