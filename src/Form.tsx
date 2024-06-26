import { FC, useState } from 'react';
import { colors } from './api';
import { Good } from './types';
import { getColorById } from './utils';

interface Props {
  onSubmit: (newGood: Good) => void;
}

export const Form: FC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const [colorId, setColorId] = useState(0);
  const [valueError, setValueError] = useState('');
  const [colorError, setColorError] = useState('');

  const handleReset = () => {
    setValue('');
    setColorId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value.trim()) {
      setValueError('Value is required');
      return;
    }

    if (!colorId) {
      setColorError('Color is required');
      return;
    }

    const newGood = {
      id: Date.now(),
      name: value,
      colorId: colorId,
      color: getColorById(colorId),
    };

    onSubmit(newGood);
    handleReset();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <select
        value={colorId}
        onChange={e => {
          setColorId(+e.target.value);
          if (colorError) setColorError('');
        }}
      >
        <option value="0" disabled>
          Choose
        </option>

        {colors.map(color => (
          <option key={color.id} value={color.id}>
            {color.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={value}
        onChange={e => {
          setValue(e.target.value);
          if (valueError) setValueError('');
        }}
      />

      <button>submit</button>

      {valueError && <p>{valueError}</p>}
      {colorError && <p>{colorError}</p>}
    </form>
  );
};
