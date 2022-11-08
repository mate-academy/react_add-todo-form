import React, { useEffect, useState } from 'react';
import './App.scss';
import { Good } from './types/Good';
import { addGood, getGoods } from './api/goods';
import { Color } from './types/Color';
import { GoodsList } from './components/GoodsList';
import { AddGoodForm } from './components/AddGoodForm';

const colorsFromServer: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

const getColorById = (colorId: number, colors: Color[]) => {
  const foundColor = colors.find(color => color.id === colorId);

  return foundColor || null;
};

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [colors, setColors] = useState<Color[]>([]);

  const getAllGoods = async () => {
    try {
      const goodsFromServer = await getGoods();

      setGoods(goodsFromServer);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error.message);
    }
  };

  const getAllColors = async () => {
    try {
      setColors(colorsFromServer);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error.message);
    }
  };

  const addNewGood = async (name: string, colorId: number) => {
    const color = getColorById(colorId, colors);

    try {
      await addGood(name, color?.name || null);
      await getAllGoods();
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllGoods();
    getAllColors();
  }, []);

  // eslint-disable-next-line no-console
  console.log('colors', colors);

  return (
    <div className="App">
      <GoodsList goods={goods} />

      <AddGoodForm addNewGood={addNewGood} colors={colors} />
    </div>
  );
};
