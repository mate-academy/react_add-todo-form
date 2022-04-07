import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import { Todo } from '../../types/types';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="container">
      <ul className="todoList">
        {todos.map(todo => (
          <li className="todoList__item" key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
};
