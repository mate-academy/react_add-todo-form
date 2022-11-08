import React, { useEffect, useState } from 'react';
import { Color } from '../../types/Color';
import { Good } from '../../types/Good';
import { getGoodById } from '../../api/goods';

interface Props {
  goodId: number;
  colors: Color[];
  editGood: (id: number, color: string) => Promise<void>
}

export const EditGoodForm: React.FC<Props> = ({ goodId, colors, editGood }) => {
  const [good, setGood] = useState<Good | null>(null);
  const [selectedColor, setSelectedColor] = useState('');

  const getGood = async (id: number) => {
    let goodFromServer;

    try {
      goodFromServer = await getGoodById(id);

      setGood(goodFromServer);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }

    return goodFromServer;
  };

  const updateGoodData = async (id: number) => {
    const goodFromServer = await getGood(id);

    setSelectedColor(goodFromServer?.color || '');
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (good && selectedColor) {
      editGood(good.id, selectedColor);
    }
  };

  useEffect(() => {
    updateGoodData(goodId);
  }, [goodId]);

  if (!good) {
    return (
      <p>No good info</p>
    );
  }

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        value={good?.name}
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

      <button type="submit">Edit</button>
    </form>
  );
};
