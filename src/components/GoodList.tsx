import { Good } from '../types/good';
import { GoodCard } from './GoodCard';

type Props = {
  goods: Good[];
  onDelete: (goodId: number) => void;
  onUpdate: (good: Good) => void;
};

export const GoodsList = ({ goods, onDelete, onUpdate }: Props) => {
  // eslint-disable-next-line no-console
  console.log('Rendering GoodList');

  return (
    <div className="GoodList">
      {goods.map(good => (
        <GoodCard
          key={good.id}
          good={good}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
