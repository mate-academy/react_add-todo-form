import React, { useState } from 'react';
import colorsFromServer from '../api/colors';
import { GoodWithColor } from '../types';

type Props = {
  addGoodHandler: (newGood: Omit<GoodWithColor, 'id'>) => void
};

export const AddGoodForm: React.FC<Props> = ({ addGoodHandler }) => {
  const [goodName, setGoodName] = useState('');
  const [goodNameError, setGoodNameError] = useState(false);
  const [colorId, setColorId] = useState(0);
  const [colorIdError, setColorIdError] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGoodName(event.target.value);

    if (goodNameError) {
      setGoodNameError(false);
    }
  }

  function resetForm() {
    setGoodName('');
    setColorId(0);
  }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let isError = false;

    if (goodName === '') {
      setGoodNameError(true);
      isError = true;
    }

    if (colorId === 0) {
      setColorIdError(true);
      isError = true;
    }

    if (isError) {
      return;
    }

    const color = colorsFromServer.find(
      ({ id }) => id === colorId,
    );

    const newGood = {
      name: goodName,
      colorId,
      color: color || null,
    };

    addGoodHandler(newGood);
    resetForm();
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="field">
        <input
          type="text"
          value={goodName}
          onChange={handleChange}
        />

        {goodNameError && (
          <span>Empty name error</span>
        )}
      </div>

      <div>
        <select
          value={colorId}
          onChange={(event) => {
            setColorId(+event.target.value);

            if (colorIdError) {
              setColorIdError(false);
            }
          }}
        >
          <option value={0} disabled>
            Choose a color
          </option>

          {colorsFromServer.map(color => (
            <option
              value={color.id}
              key={color.id}
            >
              {color.name}
            </option>
          ))}
        </select>

        {colorIdError && (
          <span>Empty color error</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
