import path from 'path'; 
import { fileURLToPath } from 'url';
import { Router } from 'express';

import isAuthenticated from '../middlewares/is-authenticated.middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsPath = path.join(__dirname, '../views');

const router = Router();

router.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.join(viewsPath, 'index.html'));
});

router.get('/auth/sign-up', (req, res) => {
  res.sendFile(path.join(viewsPath, 'register.html'));
})

export default router;
