import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Good } from './types/Good';
import { getColorById, getColors } from './api';
import { Color } from './types/Color';

type Props = {
  onSubmit: (good: Good) => void;
  onReset?: () => void;
  good?: Good;
};

export const GoodForm = ({
  onSubmit,
  onReset = () => {},
  good,
}: Props) => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    getColors().then(setColors);

    const timerId = setInterval(() => {
      getColors().then(setColors);
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const [newGoodName, setNewGoodName] = useState(good?.name || '');
  const [nameError, setNameError] = useState('');

  const [selectedColorId, setSelectedColorId] = useState(good?.colorId || 0);
  const [colorIdError, setColorIdError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
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

    if (good && selectedColorId === good.colorId && newGoodName === good.name) {
      onReset();

      return;
    }

    try {
      const color = await getColorById(selectedColorId);

      const newGood: Good = {
        id: good?.id || 0,
        name: newGoodName,
        colorId: selectedColorId,
        color,
      };

      onSubmit(newGood);
      setNewGoodName('');
      setSelectedColorId(0);
    } catch (error) {
      // handle error
    } finally {
      // do something
    }
  }

  return (
    <form onSubmit={handleSubmit} onReset={onReset}>
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

      <button type="submit">
        {good ? 'Save' : 'Add'}
      </button>

      {/* eslint-disable-next-line react/button-has-type */}
      <button type="reset">Cancel</button>
    </form>
  );
};
