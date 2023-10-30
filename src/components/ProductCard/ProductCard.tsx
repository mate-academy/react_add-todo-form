import React, { useContext, useState } from 'react';
import { GoodsWithColors } from '../../types/Good';
import { GoodForm } from '../GoodForm';
import { GoodsOperationsContext } from '../GoodsProvider';

type Props = {
  good: GoodsWithColors;
};

export const ProductCard: React.FC<Props> = ({
  good,
}) => {
  const [editing, setEditing] = useState(false);

  const { deleteGoodHandler } = useContext(GoodsOperationsContext);

  return (
    <div style={{ display: 'flex' }}>
      <button
        type="button"
        onClick={() => {
          setEditing(true);
        }}
      >
        Edit
      </button>
      {editing ? (
        <GoodForm
          good={good}
          setEditing={setEditing}
        />
      ) : (
        <article
          className="GoodCard"
          style={{ marginBottom: '8px' }}
        >
          <span
            className="GoodCard__title"
            style={{ color: good.color?.name || 'black' }}
          >
            {good.name}
          </span>
          <button
            type="button"
            onClick={() => {
              deleteGoodHandler(good.id);
            }}
          >
            X
          </button>
        </article>
      )}
    </div>
  );
};
