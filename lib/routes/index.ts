import express from 'express';
import { SearchController } from '../controller';
import passport from '../strategies/passport-strategy';
import { isBlocked, tokenBlacklist } from '../middleware';
import { searchQuery, validateErrors } from './RequestValidations';

const router = express.Router();


function getRouter() {
  router.get('/hello', (req, res) => {
    res.send({ message: 'Hello=world' });
  });


  router.get('', [passport.authenticate('jwt-access', { session: false }),
    isBlocked, tokenBlacklist, searchQuery(), validateErrors, SearchController.searchPost]);

  return router;
}

export const routes = getRouter();