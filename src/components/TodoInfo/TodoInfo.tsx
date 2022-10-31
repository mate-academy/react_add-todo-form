import React from 'react';
import { Todo } from '../Type/types';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <li style={{ listStyle: 'none' }}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <a className="UserInfo" href={`mailto:${todo.user && todo.user.email}`}>
        {todo.user && todo.user.name}
      </a>
    </li>
  );
};
