import React from 'react';
import { GoodWithColor } from '../types';

type Props = {
  goods: GoodWithColor[];
  deleteGoodHandler: (goodId: number) => void;
};

export const GoodsList: React.FC<Props> = ({ goods, deleteGoodHandler }) => {
  return (
    <section>
      {goods.map(good => (
        <article key={good.id}>
          <button
            type="button"
            onClick={() => {
              deleteGoodHandler(good.id);
            }}
          >
            -
          </button>

          <span
            style={{
              color: good.color?.name,
            }}
          >
            {good.name}
          </span>
        </article>
      ))}
    </section>
  );
};
