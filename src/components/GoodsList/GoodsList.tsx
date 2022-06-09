import React from 'react';
import { Good } from '../../react-app-env';

interface Props {
  goods: Good[]
}

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li
        key={good.id}
        style={{ color: good.color?.name }}
      >
        {good.name}
      </li>
    ))}
  </ul>
)
