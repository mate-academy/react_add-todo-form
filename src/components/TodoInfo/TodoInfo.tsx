import React from 'react';
import { Todo } from '../../types/todo';
import './TodoInfo.css';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <ul className="todoUser list">
    <>
      <p
        className="todoTitle"
        data-cy="title"
        data-id={todo.id}
      >
        TASK:
        {' '}
        {todo.title}
      </p>

      <span className="todoCompleted" data-cy="status">
        {todo.completed ? (
          <p className="completed">STATUS: COMPLETED</p>
        ) : (
          <p className="in_process">STATUS: IN PROCESS</p>)}
      </span>
    </>
  </ul>
);
