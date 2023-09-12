import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({
  todo,
}) => {
  return (
    <article key={todo.id} data-id={todo.id} className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
