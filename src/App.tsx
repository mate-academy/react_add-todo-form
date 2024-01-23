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

// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(callback: Function, delay = 1000) {
  let timerId = 0;

  return (...args: any[]) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, delay, ...args);
  };
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [goods, setGoods] = useState<Good[]>(initialGoods);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const deleteGood = (goodId: number) => {
    setGoods(current => current.filter(good => good.id !== goodId));
  };

  function addGood(good: Good) {
    setGoods(prevGoods => [...prevGoods, {
      ...good,
      id: getMaxGoodId(goods) + 1,
    }]);
  }

  const visibleGoods = useMemo(
    () => {
      console.log('Filtering by', appliedQuery);

      return goods.filter(g => g.name.includes(appliedQuery));
    },
    [appliedQuery, goods],
  );

  function updateGood(good: Good) {}

  return (
    <div className="App">
      Title:
      <input type="text" onChange={event => setTitle(event.target.value)} />
      <br />
      Filter:
      <input type="text" onChange={event => applyQuery(event.target.value)} />
      <h1>Add todo form {title}</h1>

      <GoodForm onSubmit={addGood} />
      <GoodForm onSubmit={updateGood} good={goods[0]} />
      <GoodList
        goods={visibleGoods}
        onDelete={deleteGood}
      />
    </div>
  );
};
