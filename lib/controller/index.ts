import { Request, Response, NextFunction } from 'express';
import { searchService } from '../services/Search';
//import { SearchResult } from '../DB/Models/Search';

export const searchController = async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string; // Assuming the search query is provided as a query parameter 'q'
      const searchResults = await searchService(query);
      res.status(200).json(searchResults);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };