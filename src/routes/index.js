import path from 'path'; 
import { fileURLToPath } from 'url';
import { Router } from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsPath = path.join(__dirname, '../views');

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(viewsPath, 'index.html'));
});

export default router;
