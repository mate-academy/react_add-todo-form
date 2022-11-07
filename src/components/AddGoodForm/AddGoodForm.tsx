import React, { useState } from 'react';
import cn from 'classnames';
import { Color } from '../../types/Color';

const colors: Color[] = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

interface Props {
  addNewGood: (name: string, colorId: number) => void
}

export const AddGoodForm: React.FC<Props> = ({ addNewGood }) => {
  const [newGoodName, setNewGoodName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [hasColorError, setHasColorError] = useState(false);

  const resetForm = () => {
    setNewGoodName('');
    setSelectedColorId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasNameError(!newGoodName);
    setHasColorError(!selectedColorId);

    if (newGoodName && selectedColorId) {
      addNewGood(newGoodName, selectedColorId);
      resetForm();
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        onChange={(event) => {
          setNewGoodName(event.target.value);
        }}
        value={newGoodName}
        className={cn({ error: hasNameError })}
      />

      {hasNameError && (
        <span>Name is empty</span>
      )}

      <select
        value={selectedColorId}
        onChange={(event) => {
          setSelectedColorId(+event.target.value);
        }}
        className={cn({ error: hasColorError })}
      >
        <option value="0" disabled>Choose a color</option>

        {colors.map(color => (
          <option value={color.id} key={color.id}>
            {color.name}
          </option>
        ))}
      </select>

      {hasColorError && (
        <span>Choose a color</span>
      )}

      <button type="submit">Add</button>
    </form>
  );
};
