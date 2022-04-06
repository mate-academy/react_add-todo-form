import React from 'react';
import cn from 'classnames';
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
          className={cn({ 'todo__status-green': todo.completed, 'todo__status-red': !todo.completed })}
        >
          {todo.completed ? 'Completed' : 'Not completed'}
        </span>
        <p>
          {user?.name}
        </p>
      </div>
    </>
  );
};
