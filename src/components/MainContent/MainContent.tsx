import React, {
  useState, useMemo, useCallback, useContext,
} from 'react';
import { GoodsList } from '../GoodsList';
import { GoodsContext } from '../../GoodsContextProvider';

function debounce(func: (value: string) => void, delay: number) {
  let timerId: NodeJS.Timeout;

  return (value: string) => {
    clearInterval(timerId);
    timerId = setTimeout(() => {
      func(value);
    }, delay);
  };
}

export const MainContent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const { goods } = useContext(GoodsContext);

  const decoratorApplyingQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const lowerQuery = appliedQuery.toLowerCase();

  const visibleGoods = useMemo(() => {
    return goods.filter(good => (
      good.name.toLowerCase().includes(lowerQuery)
    ));
  }, [goods, lowerQuery]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(event) => {
          const { value } = event.target;

          setQuery(value);

          decoratorApplyingQuery(value);
        }}
      />

      <GoodsList
        goods={visibleGoods}
      />
    </>
  );
};
