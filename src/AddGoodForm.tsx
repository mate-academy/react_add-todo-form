import { useContext } from 'react';
import { GoodForm } from './GoodForm';
import { GoodUpdateContext } from './GoodsContext';

export const AddGoodForm = () => {
  const { addGood } = useContext(GoodUpdateContext);

  return (
    <GoodForm onSubmit={addGood} />
  );
};
