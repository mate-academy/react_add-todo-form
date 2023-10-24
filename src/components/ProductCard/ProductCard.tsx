import React, { useState } from 'react';
import { GoodsWithColors } from '../../types/Good';
import { GoodForm } from '../GoodForm';

type Props = {
  good: GoodsWithColors;
  deleteGoodHandler: (id: number) => void;
  updateGoodsHandler: (newGood: GoodsWithColors) => void;
};

export const ProductCard: React.FC<Props> = ({
  good,
  deleteGoodHandler,
  updateGoodsHandler,
}) => {
  const [editing, setEditing] = useState(false);

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
          goodHandler={updateGoodsHandler}
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
