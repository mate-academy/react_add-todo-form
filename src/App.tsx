import React, { useState } from 'react';
import classnames from 'classnames';

import './App.css';
import { Color, Good, GoodWithoutColor } from './react-app-env';
import { GoodsList } from './components/GoodsList';

const colors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

const goodsFromServer: GoodWithoutColor[] = [
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

const getColorById = (colorId: number): Color | null => {
  return colors.find(color => color.id === colorId) || null;
};

const goodsWithColor: Good[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([...goodsWithColor]);

  const [newGoodName, setNewGoodName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [selectColorId, setSelectColorId] = useState(0);
  const [hasColorIdError, setHasColorIdError] = useState(false);

  const addGood = (name: string, colorId: number) => {
    const newGood = {
      id: Date.now(),
      name,
      colorId,
      color: getColorById(selectColorId),
    };

    setGoods((currentGoods) => [...currentGoods, newGood]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasNameError(!newGoodName);
    setHasColorIdError(!selectColorId);

    if (newGoodName && selectColorId) {
      addGood(newGoodName, selectColorId);
      setNewGoodName('');
      setSelectColorId(0);
    }
  };

  return (
    <div className="App">
      <h1>Form</h1>
      <GoodsList goods={goods} />

      <form
        onSubmit={handleSubmit}
      >
        <input
          className={classnames({ error: hasNameError })}
          type="text"
          value={newGoodName}
          placeholder="test"
          onChange={(event) => {
            setNewGoodName(event.target.value);
            setHasNameError(false);
          }}
        />

        {hasNameError && (
          <span>Name is empty</span>
        )}

        <select
          className={classnames({ error: hasColorIdError })}
          value={selectColorId}
          onChange={(event) => {
            setSelectColorId(+event.target.value);
            setHasColorIdError(false);
          }}
        >
          <option value="0" disabled>Choose a color</option>

          {colors.map(color => (
            <option
              key={color.id}
              value={color.id}
            >
              {color.name}
            </option>
          ))}
        </select>

        {hasColorIdError && (
          <span>Color is empty</span>
        )}

        <button
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
