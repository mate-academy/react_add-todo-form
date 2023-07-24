/* eslint-disable no-console */
import { memo } from 'react';
import { Good } from './types';

type Props = {
  goods: Good[];
  onDelete: (id: number) => void;
};

export const GoodList = memo(({ goods, onDelete }: Props) => {
  console.log('Render GoodList');

  return (
    <div className="GoodList">
      {goods.map(good => (
        <article key={good.id} className="GoodCard">
          <h3
            style={{ color: good.color?.name || 'black' }}
            className="GoodCard__title"
          >
            {`${good.name} #${good.id}`}
          </h3>

          <button type="button">
            edit
          </button>

          <button type="button" onClick={() => onDelete(good.id)}>
            x
          </button>
        </article>
      ))}
    </div>
  );
});
