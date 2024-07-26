import express from 'express';
const router = express.Router();
import {  create, getAll, getDetail, remove, update } from '../controllers/product.js';

router.get('/', getAll);

router.get('/:id', getDetail);  

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', remove);
export default router;
