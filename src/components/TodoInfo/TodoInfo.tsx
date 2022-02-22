import React from 'react';
import { Todo } from '../../types/Todo';
import UserInfo from '../UserInfo';

type Props = Todo;

export const TodoInfo: React.FC<Props> = ({
  id,
  title,
  completed,
  user,
}) => {
  const status = completed ? 'completed' : 'uncompleted';

  return (
    <>
      <h2 className="todos__title">{`${id} ${title}`}</h2>
      <p className="todos__status">{`Status: ${status}`}</p>
      {user && (
        <div className="todos__user">
          <UserInfo
            name={user.name}
            email={user.email}
          />
        </div>
      )}
    </>
  );
};
