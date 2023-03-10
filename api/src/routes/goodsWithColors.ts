import express from 'express';
import * as goodWithColorController from '../controller/goodsWithColors';

export const router = express.Router();

router.get('/', goodWithColorController.getAll);
