import { Request, Response } from 'express';
import { searchPosts } from '../services/Search';

export async function searchPost(req: Request, res: Response): Promise<void> {
    try {
        // Extract the search query from the request parameters
        const query: string = req.query.q as string;

        // Check if the query parameter is provided
        if (!query) {
            res.status(400).json({ error: 'Search query parameter "q" is required' });
            return;
        }

        // Call the search service to retrieve search results
        const searchResults = await searchPosts(query);

        // Send the search results as a response
        res.status(200).json(searchResults);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}