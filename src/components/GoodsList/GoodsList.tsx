import React from 'react';
import { GoodWithColor } from '../../types/Good';

interface Props {
  goods: GoodWithColor[]
}

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map((good) => (
      <li
        key={good.id}
        style={{ color: good.color?.name || 'black' }}
      >
        {good.name}
      </li>
    ))}
  </ul>
);
