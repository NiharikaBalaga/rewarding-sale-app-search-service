import express from 'express';
 import { searchPost } from '../controller';
const router = express.Router();
router.get('/hello', (req, res) => {
  res.send({ message: 'Hello=world' });
});

//router.get('/', searchController.searchPost);
 router.get('', searchPost);
export const routes = router;