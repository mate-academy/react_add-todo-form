import React from 'react';
import { Todo } from '../../types/Todo';
import TodoInfo from '../TodoInfo';

import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todos">
    {
      todos.map((todo) => (
        <li className="todos__item" key={todo.id}>
          <TodoInfo
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            user={todo.user}
          />
        </li>
      ))
    }
  </ul>
);
