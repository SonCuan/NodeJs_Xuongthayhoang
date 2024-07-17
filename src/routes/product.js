import express from 'express';
const router = express.Router();
import { creat, getAll, getDetail, remove, update } from '../controllers/product.js';

router.get('/', getAll);

router.get('/:id', getDetail);  

router.post('/create', creat);

router.put('/update', update);

router.delete('/remove', remove);
export default router;
