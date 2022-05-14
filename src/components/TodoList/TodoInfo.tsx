import React from 'react';
import { PreparedTodos } from '../PreparedTodos';

type Props = {
  todo: PreparedTodos,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="TodoInfo">
      <input
        type="checkbox"
        id={`todo-${todo.id}`}
        defaultChecked={todo.completed}
        className="TodoInfo__toggler"
      />

      <label htmlFor={`todo-${todo.id}`} className="TodoInfo__title">
        {todo.title.toUpperCase()}
      </label>
    </div>
  );
};
