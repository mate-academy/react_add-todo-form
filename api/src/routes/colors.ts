import express from 'express';
import * as colorController from '../controller/colors';

export const router = express.Router();

router.get('/', colorController.getAll);
router.get('/:colorId', colorController.getOne)
