import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';

export type Props = {
  todos: Todo[],
};
export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todos">
    {todos.map(todo => (
      <li className="todos__item" key={todo.id}>
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);
