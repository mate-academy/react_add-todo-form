import { FC } from 'react';
import { Good as GoodType } from './types';
import { Good } from './Good';

interface Props {
  goods: GoodType[];
  onDelete: (id: number) => void;
  onEdit: (name: string, id: number) => void;
}

export const List: FC<Props> = ({ goods, onDelete, onEdit }) => {
  return (
    <ul className="list">
      {goods.map(good => (
        <li key={good.id}>
          <Good good={good} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  );
};
