/* eslint-disable react/jsx-no-bind, @typescript-eslint/no-unused-vars, no-console */
import { useMemo, useState } from 'react';
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
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState('');

  // #f1, #f2
  const removeGood = (goodId: number) => {
    setGoods(prevGoods => prevGoods.filter(good => good.id !== goodId));
  };

  function addGood(good: Good) {
    setGoods(prevGoods => [
      ...prevGoods,
      {
        ...good,
        id: getMaxGoodId(goods) + 1,
      },
    ]);
  }

  const visibleGoods = useMemo(() => {
    return goods.filter(good => good.name.includes(query));
  }, [query, goods]);

  return (
    <div className="App">
      <input
        type="text"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <h1>Add good form</h1>
      Filter:
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <GoodForm onSubmit={addGood} />
      <GoodList goods={visibleGoods} onRemove={removeGood} />
    </div>
  );
};
