import classNames from 'classnames';
import { useState } from 'react';
import { getColorById, getColors } from '../services/color.service';
import { Good } from '../types';

type Props = {
  onSubmit: (good: Good) => void;
};

export const GoodForm = ({ onSubmit }: Props) => {
  const [newGoodName, setNewGoodName] = useState('');
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [nameError, setNameError] = useState('');
  const [colorIdError, setColorIdError] = useState('');

  const colors = getColors();

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

    const newGood: Good = {
      id: Date.now(),
      name: newGoodName,
      colorId: selectedColorId,
      color: getColorById(selectedColorId),
    };

    onSubmit(newGood);
    reset();
  };

  return (
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
  );
};
