import React from 'react';
import Todo from '../../types/Todo';
import UserInfo from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <div className="todo">
      <p className="title" data-cy="title">
        {title}
      </p>

      <p className="status" data-cy="status">
        {completed ? 'Done' : 'In progress'}
      </p>

      {user && <UserInfo user={user} />}
    </div>
  );
};

export default TodoInfo;
