import React from 'react';
import { Todo } from './Todo';

export type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <div className="todo_todoInfo">
      <h2 className="todo__title">
        {todo.title}
      </h2>

      <p className="todo__status">
        <strong>
          {'Status: '}
        </strong>
        {(todo.completed) ? ' Done! ' : ' In progress... '}
      </p>
    </div>
  </>
);
