/* eslint-disable no-console */
import { memo, useContext, useState } from 'react';
import { GoodCard } from './GoodCard';
import { GoodsContext } from './GoodConetxt';

export const GoodList = memo(() => {
  const [query, setQuery] = useState('');
  const goods = useContext(GoodsContext);

  const visibleGoods = goods.filter(
    good => good.name.toLowerCase().includes(query),
  );

  return (
    <div className="GoodList">
      <input
        type="search"
        placeholder="Find a good"
        onChange={e => setQuery(e.target.value.toLowerCase())}
      />

      {visibleGoods.map(good => (
        <GoodCard good={good} key={good.id} />
      ))}
    </div>
  );
});
