import React, { useState } from 'react';
import classNames from 'classnames';
import { Good } from './types/Good';
import { getColorById, colors } from './api';

type Props = {
  onSubmit: (good: Good) => void;
  good?: Good;
};

export const GoodForm = ({ onSubmit, good }: Props) => {
  const [newGoodName, setNewGoodName] = useState(good?.name || '');
  const [nameError, setNameError] = useState('');

  const [selectedColorId, setSelectedColorId] = useState(good?.colorId || 0);
  const [colorIdError, setColorIdError] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!newGoodName) {
      setNameError('Please enter good name');
    }

    if (!selectedColorId) {
      setColorIdError('Please select a color');
    }

    if (!newGoodName || !selectedColorId) {
      return;
    }

    const newGood: Good = {
      id: good?.id || 0,
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
          className={classNames({ 'with-error': nameError })}
          value={newGoodName}
          onChange={event => {
            setNewGoodName(event.target.value);
            setNameError('');
          }}
        />
        {nameError && (
          <span className="error">{nameError}</span>
        )}
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
          <option value="0">Choose a color</option>

          {colors.map(color => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
        {colorIdError && (
          <span className="error">{colorIdError}</span>
        )}
      </div>

      <button type="submit">Add</button>
    </form>
  );
};
