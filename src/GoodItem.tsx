/* eslint-disable max-len, no-console */
import React, { useContext, useState } from 'react';
import { Good } from './types/Good';
import { GoodForm } from './GoodForm';
import { GoodUpdateContext } from './GoodsContext';

type Props = {
  good: Good;
};

export const GoodItem: React.FC<Props> = React.memo(({ good }) => {
  const [editing, setEditing] = useState(false);
  const { updateGood, deleteGood } = useContext(GoodUpdateContext);

  return (
    <article
      key={good.id}
      className="GoodCard"
    >
      {editing ? (
        <GoodForm
          onSubmit={(updatedGood: Good) => {
            updateGood(updatedGood);
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
          {good.name}

          <button type="button" onClick={() => deleteGood(good.id)}>
            x
          </button>

          <button type="button" onClick={() => setEditing(true)}>
            edit
          </button>
        </p>
      )}
    </article>
  );
});
