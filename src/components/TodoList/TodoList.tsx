import React from 'react';
import cn from 'classnames';

import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li
        key={todo.id}
        className={cn(
          {
            'todo-list__item todo-list__item--completed': todo.completed,
            'todo-list__item': !todo.completed,
          },
        )}
      >
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
