import { Request, Response } from 'express';
import * as goodService from "../services/goods";

export const getAll = (req: Request, res: Response) => {
  const goods = goodService.getAll();

  res.send(goods);
}

export const getOne = (req: Request, res: Response) => {
  const { goodId } = req.params;

  if (isNaN(+goodId)) {
    res.sendStatus(422);
    return;
  }

  const foundGood = goodService.getById(+goodId);

  if (!foundGood) {
    res.sendStatus(404);
    return;
  }

  res.send(foundGood);
}

export const addGood = (req: Request, res: Response) => {
  const { name, colorId } = req.body;

  if (!name || !colorId) {
    res.sendStatus(422);
    return;
  }

  const good = goodService.addGood(name, +colorId);

  res.status(201);
  res.send(good);
}

export const removeGood = (req: Request, res: Response) => {
  const { goodId } = req.params;
  const foundGood = goodService.getById(+goodId);

  if (!foundGood) {
    res.sendStatus(404);
    return;
  }

  goodService.removeGood(+goodId);
  res.sendStatus(204);
}
