import { useDispatch } from '../GlobalContext';
import { Good } from '../types';
import { GoodForm } from './GoodForm';

export const AddGoodFrom = () => {
  const dispatch = useDispatch();

  const addGood = (good: Good) => {
    dispatch({ type: 'ADD_GOOD', payload: good });
  };

  return <GoodForm onSubmit={addGood} />;
};
