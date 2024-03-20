/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './App.scss';
import { Good } from './types/Good';
import { getColorById, getGoods } from './api';
import { GoodList } from './components/GoodList/GoodList';
import { GoodForm } from './components/GoodForm/GoodForm';

const initialGoods: Good[] = getGoods().map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

function getMaxGoodId(goods: Good[]) {
  const ids = goods.map(good => good.id);

  return Math.max(...ids, 0);
}

export const App = () => {
  const [goods, setGoods] = useState<Good[]>(initialGoods);

  function addGood(good: Good) {
    setGoods(prevGoods => [...prevGoods, {
      ...good,
      id: getMaxGoodId(goods) + 1,
    }]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <GoodForm onSubmit={addGood} />

      <GoodList goods={goods} />
    </div>
  );
};