import React, { useState } from 'react';
import cn from 'classnames';
import './App.css';
import { Color, Good, GoodWithColor } from './react-app-env';
import { GoodsList } from './components/GoodsList';

const colors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

const goodsFromServer: Good[] = [
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

const getColorById = (colorId: number) => {
  const foundColor = colors.find(color => color.id === colorId);

  return foundColor || null;
};

const goodsWithColors: GoodWithColor[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

const App: React.FC = () => {
  const [goods, setGoods] = useState<GoodWithColor[]>(goodsWithColors);
  const [newGoodName, setNewGoodName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [hasColorError, setHasColorError] = useState(false);

  const resetForm = () => {
    setNewGoodName('');
    setSelectedColorId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasNameError(!newGoodName);
    setHasColorError(!selectedColorId);

    const color = getColorById(selectedColorId);

    const newGood: GoodWithColor = {
      id: Date.now(),
      colorId: selectedColorId,
      name: newGoodName,
      color,
    };

    if (newGoodName && selectedColorId) {
      setGoods((currentGoods) => [...currentGoods, newGood]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <GoodsList goods={goods} />

      <form
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          onChange={(event) => {
            setNewGoodName(event.target.value);
          }}
          value={newGoodName}
          className={cn({ error: hasNameError })}
        />

        {hasNameError && (
          <span>Name is empty</span>
        )}

        <select
          value={selectedColorId}
          onChange={(event) => {
            setSelectedColorId(+event.target.value);
          }}
          className={cn({ error: hasColorError })}
        >
          <option value="0" disabled>Choose a color</option>

          {colors.map(color => (
            <option value={color.id} key={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        {hasColorError && (
          <span>Choose a color</span>
        )}

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
