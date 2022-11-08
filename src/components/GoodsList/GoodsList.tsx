import React from 'react';
import { Good } from '../../types/Good';

interface Props {
  goods: Good[]
}

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const DEFAULT_COLOR = 'black';

  return (
    <ul>
      {goods.map(({ id, name, color }) => (
        <li
          key={id}
          style={{ color: color || DEFAULT_COLOR }}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};
