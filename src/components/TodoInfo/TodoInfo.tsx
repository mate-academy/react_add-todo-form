import React from 'react';

import { Todo } from '../../types/Todo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div>
      <h2 className="title">{todo.title}</h2>
      <p className="is-done">
        <input type="checkbox" checked={todo.completed} />
        {todo.completed
          ? <span className="completed">Completed  😀</span>
          : <span className="not_completed">Not completed  😒</span>}
      </p>
    </div>
  );
};
