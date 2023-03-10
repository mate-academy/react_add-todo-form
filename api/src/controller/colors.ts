import { Request, Response } from 'express';
import * as colorService from "../services/colors";


export const getAll = (req: Request, res: Response) => {
  const colors = colorService.getAll();

  res.send(colors);
}

export const getOne = (req: Request, res: Response) => {
  const { colorId } = req.params;

  if (isNaN(+colorId)) {
    res.sendStatus(422);
    return;
  }

  const foundColor = colorService.getById(+colorId);

  if (!foundColor) {
    res.sendStatus(404);
    return;
  }

  res.send(foundColor);
}
