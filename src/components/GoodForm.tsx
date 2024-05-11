import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getColorById, getColors } from '../services/color.service';
import { Color, Good } from '../types';

type Props = {
  onSubmit: (good: Good) => void;
  onReset?: () => void;
  good?: Good;
};

export const GoodForm = ({ onSubmit, onReset = () => {}, good }: Props) => {
  const [newGoodName, setNewGoodName] = useState(good?.name || '');
  const [selectedColorId, setSelectedColorId] = useState(good?.colorId || 0);
  const [nameError, setNameError] = useState('');
  const [colorIdError, setColorIdError] = useState('');

  const [colors, setColors] = useState([] as Color[]);

  useEffect(() => {
    getColors().then(setColors);

    const timerId = setInterval(() => {
      // eslint-disable-next-line no-console
      console.log('Fetching colors...');

      getColors().then(setColors);
    }, 3000);

    return () => clearInterval(timerId);
  }, []);

  const reset = () => {
    setNewGoodName(good?.name || '');
    setSelectedColorId(good?.colorId || 0);
    setNameError('');
    setColorIdError('');

    onReset();
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newGoodName) {
      setNameError('Please enter a name');

      return;
    }

    if (!selectedColorId) {
      setColorIdError('Please choose a color');

      return;
    }

    const color = await getColorById(selectedColorId);

    const newGood: Good = {
      id: good?.id || Date.now(),
      name: newGoodName,
      colorId: selectedColorId,
      color,
    };

    onSubmit(newGood);
    reset();
  };

  return (
    <form onSubmit={handleFormSubmit} onReset={reset}>
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

      <button type="submit">Save</button>
      <button type="reset">Cancel</button>
    </form>
  );
};
