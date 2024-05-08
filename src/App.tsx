import { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodList';
import { Good } from './types';
import classNames from 'classnames';

const colors = [
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

const getColorById = (colorId: number) => {
  return colors.find(color => color.id === colorId);
};

const goodsWithColors: Good[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsWithColors);
  const [newGoodName, setNewGoodName] = useState('');
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [nameError, setNameError] = useState('');
  const [colorIdError, setColorIdError] = useState('');

  const addGood = (name: string, colorId: number) => {
    const newGood: Good = {
      id: Date.now(),
      name,
      colorId,
      color: getColorById(colorId),
    };

    setGoods(currentGoods => [...currentGoods, newGood]);
  };

  const reset = () => {
    setNewGoodName('');
    setSelectedColorId(0);
    setNameError('');
    setColorIdError('');
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newGoodName) {
      setNameError('Please enter a name');

      return;
    }

    if (!selectedColorId) {
      setColorIdError('Please choose a color');

      return;
    }

    addGood(newGoodName + 1, selectedColorId);
    addGood(newGoodName + 2, selectedColorId);
    addGood(newGoodName + 3, selectedColorId);
    reset();
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      <GoodsList goods={goods} />

      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <input
            type="text"
            className={classNames({ 'with-error': nameError })}
            value={newGoodName}
            onChange={event => {
              setNewGoodName(event.target.value);
              setNameError('');
            }}
          />
          <span className="error">{nameError}</span>
        </div>

        <div className="field">
          <select
            className={classNames({ 'with-error': colorIdError })}
            value={selectedColorId}
            onChange={event => {
              setSelectedColorId(+event.target.value);
              setColorIdError('');
            }}
          >
            <option value="0" disabled>
              Choose a color
            </option>

            {colors.map(color => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
          <span className="error">{colorIdError}</span>
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};
