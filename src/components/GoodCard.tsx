import { useState } from 'react';
import { Good } from '../types';
import { GoodForm } from './GoodForm';
import { useGoodMethods } from '../GoodContext';

export const GoodCard = ({ good }: { good: Good }) => {
  const [editing, setEditing] = useState(false);
  const { deleteGood, updateGood } = useGoodMethods();

  const handleFormSubmit = (newGood: Good) => {
    updateGood(newGood);
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
          <button onClick={() => deleteGood(good.id)}>x</button>
          <button onClick={() => setEditing(true)}>Edit</button>
          {good.name}
        </p>
      )}
    </article>
  );
};
