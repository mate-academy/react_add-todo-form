import React, { useState } from 'react';
import { Good } from './types';
import { GoodForm } from './GoodForm';

type Props = {
  good: Good;
  onDelete: (id: number) => void;
};

export const GoodCard: React.FC<Props> = ({
  good,
  onDelete,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <article className="GoodCard">
      {editing ? (
        <GoodForm
          onSubmit={() => {}}
          onReset={() => setEditing(false)}
        />
      ) : (
        <>
          <h3
            style={{ color: good.color?.name || 'black' }}
            className="GoodCard__title"
          >
            {`${good.name} #${good.id}`}
          </h3>

          <button type="button" onClick={() => setEditing(true)}>
            edit
          </button>

          <button type="button" onClick={() => onDelete(good.id)}>
            x
          </button>
        </>
      )}

    </article>
  );
};
