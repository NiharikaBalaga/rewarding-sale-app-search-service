import express from 'express';
import { searchPost } from '../controller';
import passport from '../strategies/passport-strategy';
import { isBlocked, tokenBlacklist } from '../middleware';

const router = express.Router();


function getRouter() {
  router.get('/hello', (req, res) => {
    res.send({ message: 'Hello=world' });
  });


  router.get('', [passport.authenticate('jwt-access', { session: false }), isBlocked, tokenBlacklist, searchPost]);
  
  return router;
}

export const routes = getRouter();