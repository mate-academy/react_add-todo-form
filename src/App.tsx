import React, { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';
import './App.scss';

import colorsFromServer from './api/colors';
import goodsFromServer from './api/goods';
import { GoodWithColor } from './types/Good';
import { Color } from './types/Color';
import { GoodsList } from './components/GoodsList';

const getColorById = (colorId: number): Color | null => {
  const foundColor = colorsFromServer.find(color => color.id === colorId);

  return foundColor || null;
};

const goodsWithColors: GoodWithColor[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const App: React.FC = () => {
  const [goods, setGoods] = useState<GoodWithColor[]>(goodsWithColors);
  const [goodName, setGoodName] = useState('');
  const [hasGoodNameError, setGoodNameError] = useState(false);

  const [selectedColorId, setSelectedColorId] = useState(0);
  const [hasColorError, setHasColorError] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setGoodName(event.target.value);
    setGoodNameError(false);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedColorId(+event.target.value);
    setHasColorError(false);
  };

  const resetForm = () => {
    setGoodName('');
    setSelectedColorId(0);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setGoodNameError(!goodName);
    setHasColorError(!selectedColorId);

    const newGood: GoodWithColor = {
      id: new Date().getTime(),
      name: goodName,
      colorId: selectedColorId,
      color: getColorById(selectedColorId),
    };

    if (goodName && selectedColorId) {
      setGoods(currentGoods => [...currentGoods, newGood]);
      resetForm();
    }
  };

  return (
    <div>
      <h1>Goods</h1>

      <form
        onSubmit={handleFormSubmit}
      >
        <div>
          <input
            type="text"
            className={cn({ 'with-error': hasGoodNameError })}
            value={goodName}
            onChange={handleInput}
          />

          {hasGoodNameError && (
            <span className="error">Name is empty</span>
          )}
        </div>

        <div>
          <select
            className={cn({ 'with-error': hasColorError })}
            value={selectedColorId}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a color</option>

            {colorsFromServer.map((color) => (
              <option value={color.id} key={color.id}>
                {color.name}
              </option>
            ))}
          </select>

          {hasColorError && (
            <span className="error">Color is empty</span>
          )}
        </div>

        <button type="submit">
          Add
        </button>
      </form>

      <GoodsList goods={goods} />
    </div>
  );
};
