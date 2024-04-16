import type { Request, Response } from 'express';
import { searchPosts } from '../services/Search';

class SearchController {
  public static async searchPost(req: Request, res: Response){
    try {
      const { matchedData: { q: query } } = req.body;

      console.log('search-query');

      // Call the search service to retrieve search results
      const searchResults = await searchPosts(query);

      return  res.send({
        searchResults
      });
    } catch (error) {
      console.error('Error searching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export { SearchController };
