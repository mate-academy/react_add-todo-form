import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { Color } from './types/Color';
import { Good } from './types/Good';
import { GoodWithColor } from './types/GoodWithColor';
import { AddGoodForm } from './components/AddGoodForm';

const colors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

const goodsFromServer: Good[] = [
  { id: 1, colorId: 1, name: 'Dumplings' },
  { id: 2, colorId: 2, name: 'Carrot' },
  { id: 3, colorId: 3, name: 'Eggs' },
  { id: 4, colorId: 1, name: 'Ice cream' },
  { id: 5, colorId: 2, name: 'Apple' },
  { id: 6, colorId: 3, name: 'Bread' },
  { id: 7, colorId: 1, name: 'Fish' },
  { id: 8, colorId: 2, name: 'Honey' },
  { id: 9, colorId: 3, name: 'Jam' },
  { id: 10, colorId: 1, name: 'Garlic' },
];

const getColorById = (colorId: number) => {
  const foundColor = colors.find(color => color.id === colorId);

  return foundColor || null;
};

const goodsWithColors: GoodWithColor[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const App: React.FC = () => {
  const [goods, setGoods] = useState<GoodWithColor[]>(goodsWithColors);

  const addNewGood = (name: string, colorId: number) => {
    const color = getColorById(colorId);

    const newGood: GoodWithColor = {
      id: Date.now(),
      colorId,
      name,
      color,
    };

    setGoods((currentGoods) => [...currentGoods, newGood]);
  };

  return (
    <div className="App">
      <GoodsList goods={goods} />

      <AddGoodForm addNewGood={addNewGood} />
    </div>
  );
};
