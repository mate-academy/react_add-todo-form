/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
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

function getNextGoodId(goods: Good[]) {
  const ids = goods.map(good => good.id);

  return Math.max(...ids, 0) + 1;
}

export const GoodsProvider: React.FC = ({ children }) => {
  const [goods, setGoods] = useState(initialGoods);

  function deleteGood(goodId: number) {
    setGoods(current => current.filter(good => good.id !== goodId));
  }

  function updateGood(goodToUpdate: Good) {
    setGoods(currentGoods => currentGoods.map(
      good => (good.id === goodToUpdate.id ? goodToUpdate : good),
    ));
  }

  function addGood(good: Good) {
    setGoods(prevGoods => [...prevGoods, {
      ...good,
      id: getNextGoodId(prevGoods),
    }]);
  }

  const methods = useMemo(() => ({ addGood, updateGood, deleteGood }), []);

  return (
    <GoodUpdateContext.Provider value={methods}>
      <GoodsContext.Provider value={goods}>
        {children}
      </GoodsContext.Provider>
    </GoodUpdateContext.Provider>
  );
};
