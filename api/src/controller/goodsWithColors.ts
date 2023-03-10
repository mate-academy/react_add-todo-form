import { Request, Response } from 'express';
import * as goodService from "../services/goods";
import * as colorService from "../services/colors";

export const getAll = (req: Request, res: Response) => {
  const goods = goodService.getAll();

  const goodsWithColor = goods.map(good => ({
    ...good,
    color: colorService.getById(good.colorId),
  }));

  res.send(goodsWithColor);
}
