/* eslint-disable object-curly-newline, no-console, react/jsx-no-bind,
react/jsx-one-expression-per-line, @typescript-eslint/no-unused-vars */
import { useCallback, useMemo, useRef, useState } from 'react';
import './App.scss';
import { GoodList } from './GoodList';
import { Good } from './types/Good';
import { GoodForm } from './GoodForm';
import { getColorById, getGoods } from './api';

const initialGoods: Good[] = getGoods().map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

function getMaxGoodId(goods: Good[]) {
  const ids = goods.map(good => good.id);

  return Math.max(...ids, 0);
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState('');
  const [goods, setGoods] = useState<Good[]>(initialGoods);

  const deleteGood = (goodId: number) => {
    setGoods(goods.filter(good => good.id !== goodId));
  };

  const ref = useRef(deleteGood); // { current: #f1 }

  console.log(ref.current === deleteGood);
  ref.current = deleteGood;

  function addGood(good: Good) {
    setGoods(prevGoods => [...prevGoods, {
      ...good,
      id: getMaxGoodId(goods) + 1,
    }]);
  }

  const visibleGoods = useMemo(() => {
    return goods.filter(
      good => good.name.includes(query),
    );
  }, [query, goods]);

  return (
    <div className="App">
      <input type="text" onChange={event => setTitle(event.target.value)} />
      <h1>Add todo form {title}</h1>
      Filter:
      <input type="text" onChange={event => setQuery(event.target.value)} />

      <GoodForm onSubmit={addGood} />
      <GoodList goods={visibleGoods} onDelete={deleteGood} />
    </div>
  );
};
