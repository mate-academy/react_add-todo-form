import { GoodsWithColors } from '../../types/Good';
import { ProductCard } from '../ProductCard';

type Props = {
  goods: GoodsWithColors[];
  deleteGoodHandler: (id: number) => void;
  updateGoodsHandler: (newGood: GoodsWithColors) => void;
};

export const GoodsList: React.FC<Props> = ({
  goods,
  deleteGoodHandler,
  updateGoodsHandler,
}) => {
  return (
    <div className="GoodList">
      {goods.map(good => (
        <ProductCard
          key={good.id}
          deleteGoodHandler={deleteGoodHandler}
          updateGoodsHandler={updateGoodsHandler}
          good={good}
        />
      ))}
    </div>
  );
};
