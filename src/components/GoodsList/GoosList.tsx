import React, { memo, useContext } from 'react';
import { ProductCard } from '../ProductCard';
import { GoodsContext } from '../GoodsProvider';

export const GoodsList: React.FC = memo(() => {
  const goods = useContext(GoodsContext);

  return (
    <ul className="GoodList">
      {goods.map(good => (
        <ProductCard
          key={good.id}
          good={good}
        />
      ))}
    </ul>
  );
});
