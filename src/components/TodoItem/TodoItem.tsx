import React from 'react';
import { Todo, User } from '../../types/types';
import './TodoItem.scss';

import usersFromServer from '../../api/users';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const user = usersFromServer.find((el: User) => el.id === todo.userId);

  return (
    <>
      <h2 className="todo_title">{todo.title}</h2>
      <div>
        <span
          className={`todo_status ${todo.completed
            ? 'todo_status-green'
            : 'todo_status-red'}`}
        >
          {todo.completed ? 'Completed' : 'Not completed'}
        </span>
        <p>
          {user && user.name}
        </p>
      </div>
    </>
  );
};
