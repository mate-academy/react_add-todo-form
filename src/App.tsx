import React, { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import './App.scss';

import goodsFromServer from './api/goods';
import colorsFromServer from './api/colors';
import { GoodWithoutColor } from './types/Good';
import { GoodsList } from './components/GoodsList';

const getColorById = (colorId: number) => {
  const foundColor = colorsFromServer.find(color => color.id === colorId);

  return foundColor || null;
};

const goodsWithColors: GoodWithoutColor[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const App: React.FC = () => {
  const [goods, setGoods] = useState<GoodWithoutColor[]>(goodsWithColors);
  const [newGoodName, setNewGoodName] = useState('');
  const [hasNameError, setNameError] = useState(false);

  const [selectedColorId, setSelectedColorId] = useState(0);
  const [hasColorIdError, setColorIdError] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNewGoodName(value);
    setNameError(false);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedColorId(+value);
    setColorIdError(false);
  };

  const addGood = (name: string, colorId: number) => {
    const newGood: GoodWithoutColor = {
      id: Date.now(),
      name,
      colorId,
      color: getColorById(colorId),
    };

    setGoods(currentGoods => (
      [...currentGoods, newGood]
    ));
  };

  const resetForm = () => {
    setNewGoodName('');
    setSelectedColorId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setNameError(!newGoodName);
    setColorIdError(!selectedColorId);

    if (newGoodName && selectedColorId) {
      addGood(newGoodName, selectedColorId);
      resetForm();
    }
  };

  return (
    <div>

      <form onSubmit={handleFormSubmit}>

        <div>
          <input
            type="text"
            className={cn({ 'with-error': hasNameError })}
            value={newGoodName}
            onChange={handleInput}
          />

          {hasNameError && (
            <span className="error">Name is empty</span>
          )}
        </div>

        <div>
          <select
            className={cn({ 'with-error': hasColorIdError })}
            value={selectedColorId}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a color</option>

            {colorsFromServer.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>

          {hasColorIdError && (
            <span className="error">Color is empty</span>
          )}
        </div>

        <button type="submit">Add</button>
      </form>

      <GoodsList goods={goods} />
    </div>
  );
};
