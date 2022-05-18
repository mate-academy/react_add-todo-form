import React from 'react';
import './TodoList.scss';
import { Todos } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  preparedTodos: Todos[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todo">
    {
      preparedTodos.map((todo) => (
        <li className="todo-list">
          <TodoInfo
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            user={todo.user}
          />
        </li>
      ))
    }
  </ul>
);
