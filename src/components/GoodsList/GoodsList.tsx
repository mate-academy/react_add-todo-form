import React from 'react';
import { GoodWithoutColor } from '../../types/Good';

interface GoodsListProps {
  goods: GoodWithoutColor[];
}

export const GoodsList: React.FC<GoodsListProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li
        key={good.id}
        style={{ color: good.color?.name || 'black' }}
      >
        {good.name}
      </li>
    ))}
  </ul>
);
