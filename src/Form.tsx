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

  const handleReset = () => {
    setValue('');
    setColorId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // !false => true
    if (!value.trim()) {
      // '   '.trim()  => '', Boolean('') => false
      setValueError('Value is required');
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
    <form onSubmit={handleSubmit}>
      <select value={colorId} onChange={e => setColorId(+e.target.value)}>
        <option value="0">Choose</option>

        {colors.map(color => (
          <option value={color.id}>{color.name}</option>
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

      {valueError && <p>{valueError}</p>}

      <button>submit</button>
    </form>
  );
};
