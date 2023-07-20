/* eslint-disable no-console */
import React from 'react';
import { Good } from './types';

type Porps = {
  goods: Good[];
};

const List: React.FC<Porps> = ({ goods }) => {
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
        </li>
      ))}
    </ul>
  );
};

export const GoodList = React.memo(List);
