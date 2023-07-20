/* eslint-disable no-console */
import React from 'react';
import { Good } from './types';

type Porps = {
  goods: Good[];
  onDelete: (id: number) => void;
};

const List: React.FC<Porps> = ({
  goods,
  onDelete,
}) => {
  console.log('Render GoodList');

  return (
    <ul>
      {goods.map(good => (
        <li
          key={good.id}
          style={{ color: good.color?.name || 'black' }}
        >
          {good.name}
          {good.id}

          <button
            type="button"
            onClick={() => onDelete(good.id)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
};

export const GoodList = React.memo(
  List,
  (prevProps, nextProps) => {
    return prevProps.goods === nextProps.goods;
  },
);
