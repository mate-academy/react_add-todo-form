import React, { useContext, useState } from 'react';
import { Good } from './types';

export const GoodsContext = React.createContext([] as Good[]);

type GoodMethods = {
  addGood: (good: Good) => void;
  updateGood: (good: Good) => void;
  deleteGood: (goodId: number) => void;
};

export const GoodMethodsContext = React.createContext<GoodMethods>({
  addGood: () => {},
  updateGood: () => {},
  deleteGood: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GoodProvider = ({ children }: Props) => {
  const [goods, setGoods] = useState<Good[]>([]);

  const addGood = (newGood: Good) => {
    setGoods(currentGoods => [...currentGoods, newGood]);
  };

  const deleteGood = (goodId: number) => {
    setGoods(currentGoods => currentGoods.filter(good => good.id !== goodId));
  };

  const updateGood = (updatedGood: Good) => {
    setGoods(currentGoods =>
      currentGoods.map(good =>
        good.id === updatedGood.id ? updatedGood : good,
      ),
    );
  };

  return (
    <GoodsContext.Provider value={goods}>
      <GoodMethodsContext.Provider value={{ addGood, updateGood, deleteGood }}>
        {children}
      </GoodMethodsContext.Provider>
    </GoodsContext.Provider>
  );
};

export const useGoods = () => useContext(GoodsContext);
export const useGoodMethods = () => useContext(GoodMethodsContext);
