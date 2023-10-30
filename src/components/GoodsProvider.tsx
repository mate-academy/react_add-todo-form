import {
  ReactNode, createContext, useCallback, useMemo, useState,
} from 'react';
import { GoodsWithColors } from '../types/Good';
import goodsFromServer from '../api/goods';
import { getColorById } from '../helpers';

interface GoodsContextOptions {
  addGoodHandler: (newGood: GoodsWithColors) => void;
  deleteGoodHandler: (id: number) => void;
  updateGoodsHandler: (newGood: GoodsWithColors) => void
}

export const GoodsContext = createContext([] as GoodsWithColors[]);

export const GoodsOperationsContext = createContext<GoodsContextOptions>({
  addGoodHandler: () => { },
  deleteGoodHandler: () => { },
  updateGoodsHandler: () => { },
});

const goodsWithColors: GoodsWithColors[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const GoodsProvider = ({ children }: { children: ReactNode }) => {
  const [goods, setGoods] = useState<GoodsWithColors[]>(goodsWithColors);

  const addGoodHandler = useCallback((newGood: GoodsWithColors) => {
    setGoods(currentGoods => [...currentGoods, newGood]);
  }, []);

  const deleteGoodHandler = useCallback((id: number) => {
    setGoods(currentGood => currentGood.filter(good => good.id !== id));
  }, []);

  const updateGoodsHandler = useCallback((newGood: GoodsWithColors) => (
    setGoods(currentGoods => (
      currentGoods.map(good => (
        good.id === newGood.id ? newGood : good
      ))
    ))
  ), []);

  const value = {
    addGoodHandler, deleteGoodHandler, updateGoodsHandler,
  };

  const operationsValue = useMemo(() => value, []);

  return (
    <GoodsOperationsContext.Provider value={operationsValue}>
      <GoodsContext.Provider value={goods}>
        {children}
      </GoodsContext.Provider>
    </GoodsOperationsContext.Provider>
  );
};
