import { FC } from 'react';
import { Good as GoodType } from './types';
import { Good } from './Good';

interface Props {
  goods: GoodType[];
}

export const List: FC<Props> = ({ goods }) => {
  return (
    <ul className="list">
      {goods.map(good => (
        <li key={good.id}>
          <Good good={good} />
        </li>
      ))}
    </ul>
  );
};
