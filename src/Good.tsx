import { FC, useState } from 'react';
import { Good as GoodType } from './types';

interface Props {
  good: GoodType;
  onDelete: (id: number) => void;
  onEdit: (name: string, id: number) => void;
}

export const Good: FC<Props> = ({ good, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [goodName, setGoodName] = useState(good.name);

  return (
    <article className="card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={goodName}
            onChange={e => setGoodName(e.target.value)}
          />

          <button
            onClick={() => {
              onEdit(goodName, good.id);
              setIsEditing(false);
            }}
          >
            ✓
          </button>
        </>
      ) : (
        <>
          <p
            className="card__title"
            style={{ color: good.color?.name || 'black' }}
          >
            {good.name}
          </p>

          <button onClick={() => onDelete(good.id)}>X</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </article>
  );
};
