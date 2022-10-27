import React from 'react';
import { Todo } from '../Type/types';

type Props = {
  renderTodo: Todo
};

export const TodoInfo: React.FC<Props> = ({ renderTodo }) => {
  return (
    <li style={{ listStyle: 'none' }}>
      <h2 className="TodoInfo__title">
        {renderTodo.title}
      </h2>

      <a className="UserInfo" href={`mailto:${renderTodo.user && renderTodo.user.email}`}>
        {renderTodo.user && renderTodo.user.name}
      </a>
    </li>
  );
};
