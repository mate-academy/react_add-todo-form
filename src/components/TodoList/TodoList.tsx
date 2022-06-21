import React from 'react';
import { PreparedTodo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

interface Props {
  preparedTodos: PreparedTodo[],
}

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="container
    is-flex
    is-justify-content-center
    is-flex-wrap-wrap
    mt-6"
  >
    {(preparedTodos || []).map(todo => (
      <li key={todo.id} className="todo-list__item">
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);
