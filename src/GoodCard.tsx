import React, { memo, useContext, useState } from 'react';
import { Good } from './types';
import { GoodForm } from './GoodForm';
import { GoodUpdateContext } from './GoodConetxt';

type Props = {
  good: Good;
};

export const GoodCard: React.FC<Props> = memo(({ good }) => {
  const [editing, setEditing] = useState(false);
  const { updateGood, deleteGood } = useContext(GoodUpdateContext);

  // eslint-disable-next-line no-console
  console.log('Render', good.id);

  return (
    <article className="GoodCard">
      {editing ? (
        <GoodForm
          onSubmit={(updatedGood) => {
            updateGood(updatedGood);
            setEditing(false);
          }}
          onReset={() => setEditing(false)}
          good={good}
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

          <button type="button" onClick={() => deleteGood(good.id)}>
            x
          </button>
        </>
      )}

    </article>
  );
});
