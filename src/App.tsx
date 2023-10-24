import { useState } from 'react';
import './App.scss';

import goodsFromServer from './api/goods';
import { GoodsList } from './components/GoodsList/GoosList';
import { GoodsWithColors } from './types/Good';
import { getColorById } from './helpers';
import { GoodForm } from './components/GoodForm';

const goodsWithColors: GoodsWithColors[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const App = () => {
  const [goods, setGoods] = useState(goodsWithColors);

  const addGoodHandler = (newGood: GoodsWithColors) => {
    setGoods(currentGoods => [...currentGoods, newGood]);
  };

  const deleteGoodHandler = (id: number) => {
    setGoods(currentGoods => currentGoods.filter(good => (
      good.id !== id
    )));
  };

  const updateGoodsHandler = (newGood: GoodsWithColors) => {
    setGoods(currentGoods => (
      currentGoods.map(good => (
        good.id === newGood.id ? newGood : good
      ))
    ));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <GoodForm
        goodHandler={addGoodHandler}
      />

      <GoodsList
        goods={goods}
        deleteGoodHandler={deleteGoodHandler}
        updateGoodsHandler={updateGoodsHandler}
      />
    </div>
  );
};
