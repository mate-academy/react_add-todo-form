import React, { useState } from 'react';
import { Good } from './types/Good';
import { GoodForm } from './GoodForm';

type Props = {
  good: Good;
  onDelete?: (goodId: number) => void;
  onUpdate?: (good: Good) => void;
};

export const GoodItem: React.FC<Props> = ({
  good,
  onUpdate = () => { },
  onDelete = () => { },
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <article
      key={good.id}
      className="GoodCard"
    >
      {editing ? (
        <GoodForm
          onSubmit={(updatedGood: Good) => {
            onUpdate(updatedGood);
            setEditing(false);
          }}
          onReset={() => setEditing(false)}
          good={good}
        />
      ) : (
        <p
          className="GoodCard__title"
          style={{ color: good.color?.name || 'black' }}
        >
          <button type="button" onClick={() => onDelete(good.id)}>
            x
          </button>

          <button type="button" onClick={() => setEditing(true)}>
            edit
          </button>

          {good.name}
        </p>
      )}
    </article>
  );
};
