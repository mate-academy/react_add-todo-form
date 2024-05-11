import { useGlobalState } from '../GlobalContext';
import { GoodCard } from './GoodCard';

export const GoodList = () => {
  const goods = useGlobalState();

  return (
    <div className="GoodList">
      {goods.map(good => (
        <GoodCard key={good.id} good={good} />
      ))}
    </div>
  );
};
