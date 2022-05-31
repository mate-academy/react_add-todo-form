import React from 'react';
import { UserInfo } from './UserInfo';
import { Todo } from './Types/Todo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <div className="todo-info">
        <h3>{`Todo: ${todo.title}`}</h3>
        <div>
          {todo.completed ? 'Completed' : 'Not Completed'}
        </div>
      </div>
      {todo.user && <UserInfo user={todo.user} />}
    </>
  );
};
