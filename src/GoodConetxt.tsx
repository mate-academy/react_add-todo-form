/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { Good } from './types';
import { getColorById } from './services/color';

// #region data
const goodsFromServer = [
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

const goodsWithColors = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));
// #endregion

export const GoodsContext = React.createContext([] as Good[]);

export const GoodUpdateContext = React.createContext({
  addGood: (good: Good) => { },
  updateGood: (good: Good) => { },
  deleteGood: (goodId: number) => { },
});

export const GoodProvider: React.FC = ({ children }) => {
  const [goods, setGoods] = useState<Good[]>(goodsWithColors);

  const deleteGood = (goodId: number) => {
    setGoods(currentGoods => currentGoods.filter(
      good => good.id !== goodId,
    ));
  };

  const addGood = (good: Good) => {
    setGoods(currentGoods => [good, ...currentGoods]);
  };

  const updateGood = (updatedGood: Good) => {
    setGoods(currentGoods => currentGoods.map(
      good => (good.id === updatedGood.id ? updatedGood : good),
    ));
  };

  const value = useMemo(() => ({
    addGood, deleteGood, updateGood,
  }), []);

  return (
    <GoodUpdateContext.Provider value={value}>
      <GoodsContext.Provider value={goods}>
        {children}
      </GoodsContext.Provider>
    </GoodUpdateContext.Provider>
  );
};
