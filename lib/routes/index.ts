import express from 'express';
 import { searchController } from '../controller';
const router = express.Router();
router.get('/hello', (req, res) => {
  res.send({ message: 'Hello=world' });
});

//router.get('/', searchController.searchPost);
 router.get('/search', searchController);
export const routes = router;