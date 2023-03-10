import express from 'express';
import * as goodController from '../controller/goods';

export const router = express.Router();

router.get('/', goodController.getAll);
router.get('/:goodId', goodController.getOne)
router.post('/', goodController.addGood)
router.delete('/:goodId', goodController.removeGood)
