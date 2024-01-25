/* eslint-disable object-curly-newline, no-console, react/jsx-no-bind,
react/jsx-one-expression-per-line, @typescript-eslint/no-unused-vars */
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import './App.scss';
import { GoodList } from './GoodList';
import { Good } from './types/Good';
import { getColorById, getGoods } from './api';
import { GoodsContext } from './GoodsContext';
import { AddGoodForm } from './AddGoodForm';

const initialGoods: Good[] = getGoods().map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

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
  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);
  const goods = useContext(GoodsContext);

  const visibleGoods = useMemo(
    () => goods.filter(g => g.name.includes(appliedQuery)),
    [appliedQuery, goods],
  );

  console.log('App');

  return (
    <div className="App">
      <div className="Filter">
        Title:
        <input type="text" onChange={event => setTitle(event.target.value)} />
        <br />
        Filter:
        <input type="text" onChange={event => applyQuery(event.target.value)} />
        <h1>Add todo form {title}</h1>
      </div>

      <AddGoodForm />
      <GoodList goods={visibleGoods} />
    </div>
  );
};
