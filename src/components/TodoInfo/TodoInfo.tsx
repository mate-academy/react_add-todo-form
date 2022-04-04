import React, { useState } from 'react';
import { UserInfo } from '../UserInfo';
import { PreparedTodo } from '../../types/PreparedTodo';

interface Props {
  todo: PreparedTodo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [completed, setCompleted] = useState(todo.completed);

  const toggleStatus = () => (
    setCompleted(!completed)
  );

  return (
    <li
      className={`todo-list__item ${
        completed
          ? 'todo-list__item--completed'
          : ''
      }`}
      key={todo.id}
    >
      <h2 className="todo-list__title">{todo.title}</h2>

      <div className="todo-list__status">
        <span>
          {`Status: ${completed ? 'completed' : 'waiting'}`}
        </span>

        <input
          type="checkbox"
          id="status"
          name="status"
          checked={completed}
          onChange={toggleStatus}
        />
      </div>

      {todo.user && <UserInfo user={todo.user} />}
    </li>
  );
};
