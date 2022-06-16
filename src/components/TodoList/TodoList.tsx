import React from 'react';
import './TodoList.scss';
import { PreparedTodo } from '../../types/app.typedefs';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  preparedTodos: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="Todo-list">
    {(preparedTodos).map(todo => (
      <li key={todo.id} className="Todo-list__item">
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
          user={todo.user || null}
        />
      </li>
    ))}
  </ul>
);
