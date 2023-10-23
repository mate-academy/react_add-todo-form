import { useState } from 'react';
import './App.scss';

import cn from 'classnames';
import colorsFromServer from './api/colors';
import goodsFromServer from './api/goods';
import { GoodsList } from './components/GoodsList/GoosList';
import { GoodsWithColors } from './types/Good';

function getColorById(id: number) {
  return colorsFromServer.find(color => color.id === id) || null;
}

const goodsWithColors: GoodsWithColors[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const App = () => {
  const [name, setName] = useState('');
  const [currentColorId, setCurrentColorId] = useState(0);
  const [goods, setGoods] = useState(goodsWithColors);
  const [hasNameError, setHasNameError] = useState(false);

  const hasEmptyFields = !name || !currentColorId;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setHasNameError(true);

      return;
    }

    const newGood: GoodsWithColors = {
      id: Date.now(),
      name,
      colorId: currentColorId,
      color: getColorById(currentColorId),
    };

    setGoods(currentGoods => [...currentGoods, newGood]);

    setName('');
    setCurrentColorId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          className={cn({
            'with-error': hasNameError,
          })}
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);

            if (event.target.value) {
              setHasNameError(false);

              return;
            }

            setHasNameError(true);
          }}
        />

        <select
          value={currentColorId}
          onChange={(event) => {
            setCurrentColorId(+event.target.value);
          }}
        >
          <option value="0" disabled>Choose a color</option>
          {colorsFromServer.map(color => (
            <option
              key={color.id}
              value={color.id}
            >
              {color.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={hasEmptyFields}
        >
          Add
        </button>
      </form>

      <GoodsList goods={goods} />
    </div>
  );
};
