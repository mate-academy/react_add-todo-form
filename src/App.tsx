/* eslint-disable no-console */
import React, { useState } from 'react';

import './App.scss';
import { GoodList } from './GoodList';
import { Good } from './types';
import { getColorById } from './services/color';
import { GoodForm } from './GoodForm';
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

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [goods, setGoods] = useState<Good[]>(goodsWithColors);

  const deleteGood = (goodId: number) => {
    setGoods(currentGoods => currentGoods.filter(
      good => good.id !== goodId,
    ));
  };

  const addGood = (good: Good) => {
    setGoods(currentGoods => [good, ...currentGoods]);
  };

  const visibleGoods = goods.filter(
    good => good.name.toLowerCase().includes(query),
  );

  return (
    <>
      <h1>Add good form</h1>
      <input
        type="search"
        placeholder="Find a good"
        onChange={e => setQuery(e.target.value.toLowerCase())}
      />
      <GoodList
        goods={visibleGoods}
        onDelete={deleteGood}
      />

      <GoodForm onSubmit={addGood} />
    </>
  );
};
