import express from 'express';
const router = express.Router();
import { checkPermission } from '../middlewares/checkPermission.js';
import {  create, getAll, getDetail, remove, update } from '../controllers/categories.js';

router.get('/',  getAll);

router.get('/:id', getDetail);  

router.post('/', checkPermission, create);

router.put('/:id', checkPermission, update);

router.delete('/:id', checkPermission , remove);

export default router;
