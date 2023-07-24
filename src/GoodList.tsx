/* eslint-disable no-console */
import { memo } from 'react';
import { Good } from './types';
import { GoodCard } from './GoodCard';

type Props = {
  goods: Good[];
  onDelete: (id: number) => void;
};

export const GoodList = memo(({ goods, onDelete }: Props) => {
  return (
    <div className="GoodList">
      {goods.map(good => (
        <GoodCard
          good={good}
          key={good.id}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});
