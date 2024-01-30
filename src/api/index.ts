import { Color } from '../types/Color';
import { Good, GoodWithoutColor } from '../types/Good';

export function getColors(): Promise<Color[]> {
  return fetch('http://localhost:3000/api/colors.json')
    .then(res => (res.ok ? res.json() : Promise.reject(res.status)));
}

export function getColorById(colorId: number): Promise<Color | undefined> {
  return getColors()
    .then(colors => colors.find(c => c.id === colorId));
}

export async function getGoods(): Promise<Good[]> {
  const colors = await getColors();
  const goods = await fetch('http://localhost:3000/api/goods.json')
    .then(res => res.json() as Promise<GoodWithoutColor[]>);

  return goods.map(good => ({
    ...good,
    color: colors.find(color => color.id === good.colorId),
  }));
}
