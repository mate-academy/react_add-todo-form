import { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodList';
import { Good } from './types';
import { GoodForm } from './components/GoodForm';
import { getColorById } from './services/color.service';

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

const goodsWithColors: Good[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsWithColors);

  const addGood = (newGood: Good) => {
    setGoods(currentGoods => [...currentGoods, newGood]);
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      <GoodsList goods={goods} />
      <GoodForm onSubmit={addGood} />
    </div>
  );
};
