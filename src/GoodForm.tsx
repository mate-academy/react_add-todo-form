/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Good } from './types';
import { getAllColors, getColorById } from './services/color';

type Props = {
  onSubmit: (good: Good) => void;
  onReset?: () => void;
};

export const GoodForm: React.FC<Props> = ({ onSubmit, onReset = () => {} }) => {
  const [goodName, setGoodName] = useState('');
  const [goodNameError, setGoodNameError] = useState('');
  const [colorId, setColorId] = useState(0);
  const [colorIdError, setColorIdError] = useState('');

  const reset = () => {
    setGoodName('');
    setGoodNameError('');

    setColorId(0);
    setColorIdError('');
  };

  const handleReset = () => {
    reset();
    onReset();
  };

  const handleSubmit = (event: React.FormEvent) => {
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
      id: 0,
      name: goodName,
      colorId,
      color: getColorById(colorId),
    };

    onSubmit(newGood);
    reset();
  };

  const colors = getAllColors();

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
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

      <button type="submit">Save</button>
      <button type="reset">Cancel</button>
    </form>
  );
};
