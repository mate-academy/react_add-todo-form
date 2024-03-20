import React, { useState } from 'react';
import { Good } from '../../types/Good';
import { colors, getColorById } from '../../api';

type Props = {
  onSubmit: (good: Good) => void,
};

export const GoodForm = ({ onSubmit }: Props) => {
  const [newGoodName, setNewGoodName] = useState('');

  const [selectedColorId, setSelectedColorId] = useState(0);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

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
      <input
        name="goodName"
        type="text"
        value={newGoodName}
        onChange={event => {
          setNewGoodName(event.target.value);
        }}
      />

        <select
          value={selectedColorId}
          onChange={event => {
            setSelectedColorId(+event.target.value);
          }}
        >
          <option value="0">Choose a color</option>

          {colors.map(color => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>

      <button type="submit">Add</button>
    </form>
  );
};