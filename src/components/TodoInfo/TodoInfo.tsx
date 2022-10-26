import React from 'react';
import { TodoProps } from '../Type/types';

type Props = {
  renderTodo: TodoProps
};

export const TodoInfo: React.FC<Props> = ({ renderTodo }) => {
  return (
    <>
      <h2 className="TodoInfo__title">
        {renderTodo.title}
      </h2>

      <a className="UserInfo" href={`mailto:${renderTodo.user && renderTodo.user.email}`}>
        {renderTodo.user && renderTodo.user.name}
      </a>
    </>
  );
};
