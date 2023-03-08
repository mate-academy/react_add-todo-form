import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { GoodWithColor } from './types/GoodWithColor';
import { AddGoodForm } from './components/AddGoodForm';
import { getGoodsWithColors } from './api/goodsWithColor';
import { addNewGood, deleteGood } from './api/goods';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<GoodWithColor[]>([]);

  const getData = async () => {
    try {
      const goodWithColors = await getGoodsWithColors();

      setGoods(goodWithColors);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addGood = async (name: string, colorId: number) => {
    try {
      await addNewGood(name, colorId);
      await getData();
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error.message);
    }
  };

  const removeGood = async (goodId: number) => {
    try {
      await deleteGood(goodId);
      await getData();
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error.message);
    }
  };

  return (
    <div className="App">
      <GoodsList goods={goods} removeGood={removeGood} />

      <AddGoodForm addNewGood={addGood} />
    </div>
  );
};
