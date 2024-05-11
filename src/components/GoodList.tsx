import { GoodCard } from './GoodCard';
import { useGoods } from '../GoodContext';

export const GoodList = () => {
  const goods = useGoods();

  return (
    <div className="GoodList">
      {goods.map(good => (
        <GoodCard key={good.id} good={good} />
      ))}
    </div>
  );
};
