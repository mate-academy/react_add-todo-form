/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Good } from './types/Good';
import { getColorById, getGoods } from './api';

const initialGoods: Good[] = getGoods().map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const GoodsContext = React.createContext([] as Good[]);

export const GoodUpdateContext = React.createContext({
  addGood: (good: Good) => {},
  deleteGood: (goodId: number) => {},
  updateGood: (good: Good) => {},
});

export const GoodsProvider: React.FC = ({ children }) => {
  const [goods, setGoods] = useState(initialGoods);

  function getNextGoodId() {
    const ids = goods.map(good => good.id);

    return Math.max(...ids, 0) + 1;
  }

  function deleteGood(goodId: number) {
    setGoods(current => current.filter(good => good.id !== goodId));
  }

  function updateGood(goodToUpdate: Good) {
    setGoods(currentGoods => {
      const copy = [...currentGoods];
      const position = copy.findIndex(good => good.id === goodToUpdate.id);

      copy[position] = goodToUpdate;

      return copy;
    });
  }

  function addGood(good: Good) {
    setGoods(prevGoods => [...prevGoods, {
      ...good,
      id: getNextGoodId(),
    }]);
  }

  return (
    <GoodUpdateContext.Provider value={{ addGood, updateGood, deleteGood }}>
      <GoodsContext.Provider value={goods}>
        {children}
      </GoodsContext.Provider>
    </GoodUpdateContext.Provider>
  );
};
