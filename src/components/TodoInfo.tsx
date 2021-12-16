import React from 'react';
import { Todo } from '../types/Todo';
// import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todos__info">
    <h3 className="todos__title">
      {todo.title}
    </h3>

    <p className="todos__status">
      {todo.completed ? 'Completed' : 'Not completed'}
    </p>

    {todo.user && (
      <p className="todos__user">
        {`${todo.user.name}, ${todo.user.email}`}
      </p>
    )}
  </div>
);
