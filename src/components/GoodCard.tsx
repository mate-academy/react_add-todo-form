import { useState } from 'react';
import { Good } from '../types';
import { GoodForm } from './GoodForm';
import { actions, useDispatch } from '../GlobalContext';

export const GoodCard = ({ good }: { good: Good }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const deleteGood = () => {
    dispatch(actions.deleteGood(good.id));
  };

  const handleFormSubmit = (newGood: Good) => {
    dispatch(actions.updateGood({ ...good, ...newGood }));
    setEditing(false);
  };

  return (
    <article className="GoodCard">
      {editing && <GoodForm onSubmit={handleFormSubmit} good={good} />}

      {!editing && (
        <p
          className="GoodCard__title"
          style={{ color: good.color?.name || 'black' }}
        >
          <button onClick={deleteGood}>x</button>
          <button onClick={() => setEditing(true)}>Edit</button>
          {good.name}
        </p>
      )}
    </article>
  );
};
