import React from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="todoList__info">
      <h2 className="todoList__title">{todo.title}</h2>
      <p className="todoList__completion">
        {todo.completed
          ? <span className="todoList__completion--completed">Status: Completed</span>
          : <span className="todoList__completion--not_completed">Status: Not completed</span>}
      </p>
    </div>
  );
};
