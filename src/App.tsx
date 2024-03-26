/* eslint-disable react/jsx-no-bind, @typescript-eslint/no-unused-vars, no-console */
import { useCallback, useContext, useMemo, useState } from 'react';
import './App.scss';
import { Good } from './types/Good';
import { getColorById, getGoods } from './api';
import { GoodList } from './components/GoodList/GoodList';
import { GoodForm } from './components/GoodForm/GoodForm';

import debounce from 'lodash.debounce';
import { GoodsContext } from './components/GoodsContext';

export const App = () => {
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const goods = useContext(GoodsContext);

  const visibleGoods = useMemo(() => {
    console.log('Filtering....');

    return goods.filter(good => good.name.includes(appliedQuery));
  }, [appliedQuery, goods]);

  return (
    <div className="App">
      Title:
      <input
        type="text"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <br />
      Filter:
      <input
        type="text"
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          applyQuery(event.target.value);
        }}
      />
      <h1>Add good form</h1>
      <GoodForm />
      <GoodList goods={visibleGoods} />
    </div>
  );
};
