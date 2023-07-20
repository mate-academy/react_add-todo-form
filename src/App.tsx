/* eslint-disable no-console */
import React, { useMemo, useRef, useState } from 'react';

import './App.scss';
import { GoodList } from './GoodList';
import { Color, Good } from './types';

const colors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

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

function getColorById(id: number) {
  return colors.find(color => color.id === id);
}

const goodsWithColors = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [goods, setGoods] = useState<Good[]>(goodsWithColors);
  const [goodName, setGoodName] = useState('');
  const [goodNameError, setGoodNameError] = useState('');
  const [colorId, setColorId] = useState(0);
  const [colorIdError, setColorIdError] = useState('');

  function reset() {
    setGoodName('');
    setGoodNameError('');

    setColorId(0);
    setColorIdError('');
  }

  function handleSubmit(event: React.FormEvent) {
    // #region validation
    event.preventDefault();

    if (!goodName) {
      setGoodNameError('Name is required');
    }

    if (!colorId) {
      setColorIdError('Color is required');
    }

    if (!goodName || !colorId) {
      return;
    }
    // #endregion

    const newGood: Good = {
      id: 999,
      name: goodName,
      colorId,
      color: getColorById(colorId),
    };

    setGoods(prevGoods => [newGood, ...prevGoods]);
    reset();
  }

  const deleteGood = (goodId: number) => {
    setGoods(currentGoods => currentGoods.filter(
      good => good.id !== goodId,
    ));
  };

  const visibleGoods = useMemo(
    () => {
      console.log('filtering');

      return goods;
    },
    [query, goods],
  );

  const timerId = useRef(0);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setQuery(e.target.value);
    }, 1000);
  };

  return (
    <>
      <h1>Add good form</h1>
      <input
        type="search"
        placeholder="Find a good"
        onChange={handleQueryChange}
      />
      <GoodList
        goods={visibleGoods}
        onDelete={deleteGood}
      />

      <form onSubmit={handleSubmit}>
        <h2>Create a good</h2>

        <div className="field">
          <input
            type="text"
            placeholder="Good Name"
            value={goodName}
            onChange={event => {
              setGoodName(event.target.value);
              setGoodNameError('');
            }}
          />
          <span className="error">{goodNameError}</span>
        </div>

        <div className="field">
          <select
            value={colorId}
            onChange={event => {
              setColorId(+event.target.value);
              setColorIdError('');
            }}
          >
            <option value="0" disabled>Choose a color</option>

            {colors.map(color => (
              <option value={color.id} key={color.id}>
                {color.name}
              </option>
            ))}
          </select>
          <span className="error">{colorIdError}</span>
        </div>

        <button type="submit">Add</button>
      </form>
    </>
  );
};
