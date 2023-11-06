import React, { memo, useContext } from 'react';
import { ProductCard } from '../ProductCard';
import { GoodsContext } from '../GoodsProvider';

export const GoodsList: React.FC = memo(() => {
  const { todos } = useContext(GoodsContext);

  return (
    <ul className="GoodList">
      {todos.map(todo => (
        <ProductCard
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
});
