import { useGoodMethods } from '../GoodContext';
import { GoodForm } from './GoodForm';

export const AddGoodFrom = () => {
  const { addGood } = useGoodMethods();

  return <GoodForm onSubmit={addGood} />;
};
