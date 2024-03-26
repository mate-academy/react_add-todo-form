/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import { Good } from '../types/Good';
import { GoodsControlContext } from './GoodsContext';

type Props = {
  good: Good;
};

export const GoodItem: React.FC<Props> = React.memo(({ good }) => {
  const { removeGood } = useContext(GoodsControlContext);

  console.log('GoodItem is rendering: ', good.id);

  return (
    <article key={good.id} className="GoodCard">
      <p
        className="GoodCard__title"
        style={{ color: good.color?.name || 'black' }}
      >
        <button type="button" onClick={() => removeGood(good.id)}>
          x
        </button>
        {good.name}
      </p>
    </article>
  );
});
