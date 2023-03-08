import { GoodWithColor } from '../types/GoodWithColor';

const BASE_URL = 'http://localhost:5000/goodsWithColors';

export const getGoodsWithColors = async (): Promise<GoodWithColor[]> => {
  const response = await fetch(BASE_URL);

  return response.json();
};
