import React, { useEffect, useState } from 'react';
import { Color } from '../../types/Color';
import { getGoodById } from '../../api/goods';
import { Good } from '../../types/Good';

interface Props {
  goodId: number;
  colors: Color[];
  editGood: (id: number, color: string) => Promise<void>
}

export const EditGoodForm: React.FC<Props> = ({
  goodId,
  colors,
  editGood,
}) => {
  const [good, setGood] = useState<Good | null>(null);
  const [selectedColor, setSelectedColor] = useState('');

  const getGood = async (id: number) => {
    try {
      const goodFromServer = await getGoodById(id);

      setGood(goodFromServer);
      setSelectedColor(goodFromServer.color);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error.message);
    }
  };

  const handleFormSubmit = (even: React.FormEvent) => {
    even.preventDefault();

    if (good && selectedColor) {
      editGood(good.id, selectedColor);
    }
  };

  useEffect(() => {
    getGood(goodId);
  }, [goodId]);

  if (!good) {
    return (
      <span>No good info</span>
    );
  }

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <input
        value={good.name}
        type="text"
        disabled
      />

      <select
        value={selectedColor}
        onChange={(event) => {
          setSelectedColor(event.target.value);
        }}
      >
        {colors.map(color => (
          <option value={color.name} key={color.id}>
            {color.name}
          </option>
        ))}
      </select>

      <button type="submit">
        Edit
      </button>
    </form>
  );
};
