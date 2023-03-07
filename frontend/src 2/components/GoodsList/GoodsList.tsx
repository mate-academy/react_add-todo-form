import React from 'react';
import { GoodWithColor } from '../../types/GoodWithColor';

interface Props {
  goods: GoodWithColor[]
}

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const DEFAULT_COLOR = 'black';

  return (
    <ul>
      {goods.map(({ id, name, color }) => (
        <li
          key={id}
          style={{ color: color?.name || DEFAULT_COLOR }}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};
