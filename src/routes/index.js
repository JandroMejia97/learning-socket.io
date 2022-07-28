import path from 'path'; 
import { fileURLToPath } from 'url';
import { Router } from 'express';
import { body, validationResult } from "express-validator";

import isAuthenticated from '../middlewares/is-authenticated.middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsPath = path.join(__dirname, '../views');

const router = Router();

router.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.join(viewsPath, 'index.html'));
});

router.get('/auth/sign-up', (req, res) => {
  res.sendFile(path.join(viewsPath, 'register.html'));
});

router.post('/auth/sign-up', body('username').isLength({ min: 3 }), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    res.cookie('username', req.body.username);
    res.redirect('/');
  }
});

export default router;
