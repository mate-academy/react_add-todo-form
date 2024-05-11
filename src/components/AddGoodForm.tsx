import { Good } from '../types';
import { GoodForm } from './GoodForm';
import { actions, useDispatch } from '../GlobalContext';

export const AddGoodFrom = () => {
  const dispatch = useDispatch();

  const addGood = (good: Good) => {
    dispatch(actions.addGood(good));
  };

  return <GoodForm onSubmit={addGood} />;
};
