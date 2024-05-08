import { useState } from 'react';
import { Good } from '../types';
import { GoodForm } from './GoodForm';

type Props = {
  good: Good;
  onDelete: (goodId: number) => void;
  onUpdate: (good: Good) => void;
};

export const GoodCard = ({ good, onDelete, onUpdate }: Props) => {
  const [editing, setEditing] = useState(false);

  const handleFormSubmit = (newGood: Good) => {
    onUpdate(newGood);
    setEditing(false);
  };

  return (
    <article className="GoodCard">
      {editing ? (
        <GoodForm onSubmit={handleFormSubmit} good={good} />
      ) : (
        <p
          className="GoodCard__title"
          style={{ color: good.color?.name || 'black' }}
        >
          <button onClick={() => onDelete(good.id)}>x</button>
          <button onClick={() => setEditing(true)}>Edit</button>
          {good.name}
        </p>
      )}
    </article>
  );
};
