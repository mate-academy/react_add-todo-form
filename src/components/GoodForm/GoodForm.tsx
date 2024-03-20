import React, { useState } from 'react';
import { Good } from '../../types/Good';
import { colors, getColorById } from '../../api';
import classNames from 'classnames';

type Props = {
  onSubmit: (good: Good) => void;
};

export const GoodForm = ({ onSubmit }: Props) => {
  const [newGoodName, setNewGoodName] = useState('');
  const [goodNameError, setGoodNameError] = useState('');

  const [selectedColorId, setSelectedColorId] = useState(0);
  const [colorIdError, setColorIdError] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!newGoodName) {
      setGoodNameError('Please enter good name');
    }

    if (!selectedColorId) {
      setColorIdError('Please select a color');
    }

    if (!newGoodName || !selectedColorId) {
      return;
    }

    const newGood: Good = {
      id: 0,
      name: newGoodName,
      colorId: selectedColorId,
      color: getColorById(selectedColorId),
    };

    onSubmit(newGood);
    setNewGoodName('');
    setSelectedColorId(0);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          name="goodName"
          type="text"
          className={classNames({
            'with-error': goodNameError,
          })}
          value={newGoodName}
          onChange={event => {
            setNewGoodName(event.target.value);
            setGoodNameError('');
          }}
        />

        {goodNameError && <span className="error">{goodNameError}</span>}
      </div>

      <div className="field">
        <select
          className={classNames({
            'with-error': colorIdError,
          })}
          value={selectedColorId}
          onChange={event => {
            setSelectedColorId(Number(event.target.value));
            setColorIdError('');
          }}
        >
          <option value="0">Choose a color</option>

          {colors.map(color => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        {colorIdError && <span className="error">{colorIdError}</span>}
      </div>

      <button type="submit">Add</button>
    </form>
  );
};
