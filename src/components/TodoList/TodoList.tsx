import React from 'react';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

interface Props {
  preparedTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todo-main">
    {preparedTodos.map((preparedTodo: Todo) => (
      <li key={preparedTodo.id} className="todo-main__list">
        <TodoInfo
          title={preparedTodo.title}
          completed={preparedTodo.completed}
          user={preparedTodo.user}
        />
      </li>
    ))}
  </ul>
);
